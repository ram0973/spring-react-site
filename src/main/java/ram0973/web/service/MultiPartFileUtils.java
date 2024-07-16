package ram0973.web.service;

import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Calendar;
import java.util.TimeZone;

interface MultiPartFileUtils {

    static Path getResourceAsFile(String relativeFilePath) throws FileNotFoundException {
        return ResourceUtils.getFile(ResourceUtils.CLASSPATH_URL_PREFIX + relativeFilePath).toPath();
    }

    static String saveMultiPartImage(MultipartFile image) throws IOException {
        Path root = getResourceAsFile("static/upload/images");
        String originalFileName = image.getOriginalFilename();
        assert originalFileName != null;
        String originalFileExtension = originalFileName.substring(originalFileName.lastIndexOf('.') + 1);
        Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
        String year = String.valueOf(cal.get(Calendar.YEAR));
        String month = String.valueOf(cal.get(Calendar.MONTH) + 1);
        String day = String.valueOf(cal.get(Calendar.DAY_OF_MONTH));

        Path pathWithDate = Files.createDirectories(Path.of(root.toString(), year, month, day));
        Path newFilePath = Files.createTempFile(pathWithDate, "", "." + originalFileExtension);

        image.transferTo(newFilePath);
        return newFilePath.toString();
    }
}
