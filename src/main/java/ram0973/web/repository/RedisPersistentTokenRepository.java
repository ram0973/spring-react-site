package ram0973.web.repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.lang.Nullable;
import org.springframework.security.web.authentication.rememberme.PersistentRememberMeToken;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.TimeUnit;

//@Repository
@Log4j2
@RequiredArgsConstructor
class RedisPersistentTokenRepository implements PersistentTokenRepository {

    private final static int TOKEN_VALID_DAYS = 14;
    private final static StringRedisSerializer stringRedisSerializer = new StringRedisSerializer();
    private final static String EMAIL = "email";
    private final static String TOKEN = "token";
    private final static String LAST_USED_DATE = "last_used_date";
    private final static String NAME_SPACE = "spring:security:rememberMe:token:";

    private final RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();

    @Override
    public void createNewToken(PersistentRememberMeToken token) {
        String key = generateKey(token.getSeries());
        Map<String, String> data = Map.of(
            EMAIL, token.getUsername(),
            TOKEN, token.getTokenValue(),
            LAST_USED_DATE, String.valueOf(token.getDate().getTime())
        );
        redisTemplate.opsForHash().putAll(key, data);
        redisTemplate.expire(key, TOKEN_VALID_DAYS, TimeUnit.DAYS);
    }

    @Override
    public void updateToken(String series, String tokenValue, Date lastUsed) {
        String key = generateKey(series);
        Map<String, String> data = Map.of(
            TOKEN, tokenValue,
            LAST_USED_DATE, String.valueOf(lastUsed.getTime())
        );
        redisTemplate.opsForHash().putAll(key, data);
        redisTemplate.expire(key, TOKEN_VALID_DAYS, TimeUnit.DAYS);
    }

    @Override
    @Nullable
    public PersistentRememberMeToken getTokenForSeries(String seriesId) {
        String key = generateKey(seriesId);
        List<Object> hashValues = redisTemplate.opsForHash().multiGet(key, Arrays.asList(EMAIL, TOKEN, LAST_USED_DATE));
        String email = (String) hashValues.get(0);
        String tokenValue = (String) hashValues.get(1);
        LocalDate date = (LocalDate) hashValues.get(2);
        if (email == null || tokenValue == null || date == null) {
            return null;
        }
        long timestamp = Long.parseLong(String.valueOf(date));
        Date time = new Date(timestamp);
        return new PersistentRememberMeToken(email, seriesId, tokenValue, time);
    }

    @Override
    public void removeUserTokens(String email) {
        byte[] hashKey = stringRedisSerializer.serialize(email);
        Objects.requireNonNull(redisTemplate.getConnectionFactory());
        RedisConnection redisConnection = redisTemplate.getConnectionFactory().getConnection();
        try (Cursor<byte[]> cursor = redisConnection.scan(ScanOptions.scanOptions().match(generateKey("*")).count(1024).build())) {
            while (cursor.hasNext()) {
                byte[] key = cursor.next();
                byte[] hashValue = redisConnection.hGet(key, hashKey);
                String storeName = stringRedisSerializer.deserialize(hashValue);
                if (email.equals(storeName)) {
                    redisConnection.expire(key, 0L);
                    return;
                }
            }
        }
    }

    private static String generateKey(String series) {
        return NAME_SPACE + series;
    }
}
