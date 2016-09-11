# Pepagis

元：
https://github.com/pxgrid/aigis/

## Pepagis Styleguide

https://sizucca.github.io/pepagis/


## Install

```sh
git clone git@github.com:sizucca/pepagis.git
git clone git@github.com:sizucca/pepabo.css-framework.git
```

build

```sh
cd pepagis
npm install --save-dev node-aigis
./node_modules/.bin/aigis run -c ./pepagis_stuffs/config.yml
```

gulp で開発しやすくする

```sh
# cd pepagis
npm install --save-dev gulp gulp-aigis browser-sync gulp-sass gulp-cssmin gulp-plumber node-sass
# npm install --save-dev gulp
# npm install --save-dev gulp-aigis
# npm install --save-dev browser-sync
# npm install --save-dev gulp-sass
# npm install --save-dev gulp-cssmin
# npm install --save-dev gulp-plumber
# npm install --save-dev node-sass
```

gulp で監視しながら作業

```sh
# cd pepagis
gulp
```

gulp で監視しながら  
https://github.com/sizucca/pepabo.css-framework/tree/master/project_sho/stylesheets/scss/_application/objects/components  
この辺のコンポーネント触ると反映（といいつつ framework のファイル設計が全然不完全...）


