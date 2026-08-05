plugins {
    id("com.android.application")
}

android {
    namespace = "kr.co.daeruk.priceone"
    compileSdk = 35

    defaultConfig {
        applicationId = "kr.co.daeruk.priceone"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

dependencies {
    implementation("androidx.appcompat:appcompat:1.7.0")
}
