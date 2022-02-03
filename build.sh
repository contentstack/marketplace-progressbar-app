set -e
#The above command is to fail build if any one of the below build steps fail

rm -rf to-deploy
mkdir to-deploy

#API Build
cd api
npm install --only=prod
zip -r api.zip * -x jest* package*.json server.js
mv api.zip ../to-deploy
cd ..


#UI Build
#In ui/src/config.js -> API_URL , replace the lambda URL where API is deloyed 
updateUIConfigFile() {
rm -rf src/config.js
cat << EOF > src/config.js
	const config = {
	  API_URL: "https://localhost:8080"
	};
	export default config;
EOF
}
cd ui
rm -rf build
updateUIConfigFile
npm install
npm run test
npm run build
zip -r ui.zip build/
mv ui.zip ../to-deploy
cd ..
