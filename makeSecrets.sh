echo "Using"

cat > ./src/secrets.ts << EOF
export const secrets = {
  salt: '$SALT',
  apiKey: '$API_KEY',
  figmaApiKey: '$FIGMA_API_KEY',
  generatedPhotosApiKey: '$GENERATED_PHOTO_API_KEY',
  firebaseApiKey: '$FIREBASE_API_KEY',
  firebaseAuthDomain: '$FIREBASE_AUTH_DOMAIN',
  firebaseProjectId: '$FIREBASE_PROJECT_ID',
  firebaseStorageBucket: '$FIREBASE_STORAGE_BUCKET',
  firebaseMessagingSenderId: '$FIREBASE_MESSAGING_SENDER_ID',
  firebaseAppId: '$FIREBASE_APP_ID',
  firebaseCollectionId: '$FIREBASE_COLLECTION_ID',
};
EOF
