mv .env.local .env.locals
npm run build
mv .env.locals .env.local
zip -r dist.zip dist/
