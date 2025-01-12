import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"nodality-47c38","appId":"1:258860610070:web:d6376ee68f401b7becbb37","storageBucket":"nodality-47c38.firebasestorage.app","apiKey":"AIzaSyBaSGmRQjAR0B3el_tKgK-mIU0Mns9BjMY","authDomain":"nodality-47c38.firebaseapp.com","messagingSenderId":"258860610070"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()),
    provideRouter(routes),
  ]
};
