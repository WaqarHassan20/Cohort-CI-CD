cd ~/Cohort-ci-cd || exit 1
git pull origin main
npm install
npm run build
npm run start
