import com.github.gradle.node.yarn.task.YarnInstallTask
import com.github.gradle.node.yarn.task.YarnTask

plugins {
    java
    id("org.springframework.boot") version "3.2.0"
    id("io.spring.dependency-management") version "1.1.4"
    id("com.github.node-gradle.node") version "7.0.1"
}

group = "org.antonus"
version = "0.0.7"

val mapstructVersion = "1.5.5.Final"

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
    implementation("org.mapstruct:mapstruct:${mapstructVersion}")
    annotationProcessor("org.mapstruct:mapstruct-processor:$mapstructVersion")
    compileOnly("org.projectlombok:lombok")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
    annotationProcessor("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok-mapstruct-binding:0.2.0")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    implementation("org.eclipse.paho:org.eclipse.paho.client.mqttv3:1.2.5")
}

tasks.withType<Test> {
    useJUnitPlatform()
}

tasks.npmInstall {
    enabled=false
}

tasks.named<YarnInstallTask>(YarnInstallTask.NAME){
    workingDir = file("${project.projectDir}/front")
    ignoreExitValue.set(true)
}

val yarnBuild = tasks.register<YarnTask>("yarnBuild") {
    dependsOn(YarnInstallTask.NAME)
    workingDir = file("${project.projectDir}/front")
    args.set(listOf("build"))
    inputs.dir(fileTree("front/src").exclude("**/*.test.js").exclude("**/*.spec.js").exclude("**/__tests__/**/*.js"))
    inputs.dir("front/node_modules")
    outputs.dir("front/dist")
}


val copyReact = tasks.register<Copy>("copyReact") {
    dependsOn(yarnBuild)
    from("front/dist")
    into("build/resources/main/static/")
}

tasks.withType<JavaCompile> {
    dependsOn(copyReact)
}
