import com.github.gradle.node.npm.task.NpmTask

plugins {
    java
    id("org.springframework.boot") version "3.3.1"
    id("io.spring.dependency-management") version "1.1.5"
    id("com.github.node-gradle.node") version "7.0.2"
}

group = "ram0973"
version = "0.0.1-SNAPSHOT"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

node {
    download.set(false)
    //workDir.set(file("${project.projectDir}/.cache/nodejs"))
    //npmWorkDir.set(file("${project.projectDir}/.cache/npm"))
    nodeProjectDir.set(file("${project.projectDir}/src/main/react"))
}

val buildWebApp = tasks.register<NpmTask>("buildWebapp") {
    args.set(listOf("" +
            "run", "build"))
    dependsOn(tasks.npmInstall)
    inputs.dir("src/main/react")
    inputs.dir("src/main/react/node_modules")
    inputs.files("src/main/react/package.json", "src/main/react/package-lock.json", "src/main/react/tsconfig.json", "src/main/react/tsconfig.node.json")
    //outputs.dir("build/resources/main/static")
}

val copyWebApp = tasks.register<Copy>("copyWebApp") {
    from("src/main/react/dist/.")
    into("build/resources/main/static")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-starter-data-redis")
    implementation("org.springframework.session:spring-session-core")
    implementation("org.springframework.session:spring-session-data-redis")

    implementation("org.apache.commons:commons-lang3:3.15.0")

    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.mapstruct:mapstruct:1.5.5.Final")
    runtimeOnly("org.postgresql:postgresql")
    compileOnly("org.projectlombok:lombok")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    developmentOnly("org.springframework.boot:spring-boot-docker-compose")
    annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
    annotationProcessor("org.projectlombok:lombok")
    annotationProcessor("org.mapstruct:mapstruct-processor:1.5.5.Final")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.security:spring-security-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<Test> {
    useJUnitPlatform()
}

