import com.github.gradle.node.npm.task.NpmTask

plugins {
    java
    id("org.springframework.boot") version "3.2.0"
    id("io.spring.dependency-management") version "1.1.4"
    id("com.github.node-gradle.node") version "7.0.1"
}

group = "org.antonus"
version = "0.0.5"

java {
    sourceCompatibility = JavaVersion.VERSION_21
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter")
    implementation("org.springframework.boot:spring-boot-starter-json")
    implementation("org.springframework.boot:spring-boot-starter-cache")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.github.ben-manes.caffeine:caffeine")
    implementation("com.jayway.jsonpath:json-path")
    implementation("net.minidev:json-smart")
    compileOnly("org.projectlombok:lombok")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
    annotationProcessor("org.projectlombok:lombok")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    implementation("org.eclipse.paho:org.eclipse.paho.client.mqttv3:1.2.5")
}

tasks.withType<Test> {
    useJUnitPlatform()
}


val npmInstalls = tasks.register<NpmTask>("npmInstalls") {
    workingDir = file("${project.projectDir}/front")
    args.set(listOf("install"))
}

val npmBuild = tasks.register<NpmTask>("npmBuild") {
    dependsOn(npmInstalls)
    workingDir = file("${project.projectDir}/front")
    args.set(listOf("run","build"))
    inputs.dir(fileTree("front/src").exclude("**/*.test.js").exclude("**/*.spec.js").exclude("**/__tests__/**/*.js"))
    inputs.dir("front/node_modules")
    inputs.dir("front/public")
    outputs.dir("front/build")
}

val copyReact = tasks.register<Copy>("copyReact") {
    dependsOn(npmBuild)
    from("front/build")
    into("build/resources/main/static/")
}

tasks.withType<JavaCompile> {
    dependsOn(copyReact)
}
