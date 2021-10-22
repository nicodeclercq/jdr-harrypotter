echo "Using"

cat > ./src/secrets.ts << EOF
export const secrets = {
  salt: '$SALT',
  apiKey: '$API_KEY',
  figmaApiKey: '$FIGMA_API_KEY',
  generatedPhotosApiKey: '$GENERATED_PHOTO_API_KEY',
};
EOF
