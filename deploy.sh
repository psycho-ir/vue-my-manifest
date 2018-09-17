set -x
version=$1
yarn build
fandogh image publish --version=$version
fandogh service apply -f manifest.ym
