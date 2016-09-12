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

`pepagis` 内で、必要な npm をインストール。

```sh
cd pepagis
npm install --save-dev gulp del gulp-sass gulp-plumber gulp-aigis browser-sync run-sequence

# ↑ は以下をまとめて install しているだけ
# npm install --save-dev gulp
# npm install --save-dev del
# npm install --save-dev gulp-sass
# npm install --save-dev gulp-plumber
# npm install --save-dev gulp-aigis
# npm install --save-dev browser-sync
# npm install --save-dev run-sequence
```

`gh-pages` ブランチを `pepagis/public_html` にチェックアウト。  
（こうする事で、自動コンパイルされたファイルをそのまま `gh-pages` に コミットできるようになる）

```sh
# 【注意】`git worktree` を使うには`git 2.7.0` 以降が必要。
# cd pepagis
git worktree add public_html gh-pages
```

以下のディレクトリに移動すると、ブランチが `master` から `gh-pages` に変わっていれば成功。

```sh
# 【注意】`public_html` ディレクトリにある `.git` は絶対に消さない事！（`public_html` ごと消すとかダメ、絶対）
# cd pepagis
cd public_html
```

`gulp` コマンドで、作業開始。

```sh
# cd pepagis
gulp
```

gulp で監視しながら  
https://github.com/sizucca/pepabo.css-framework/tree/master/project_sho/stylesheets/scss/_application/objects/components  
この辺のコンポーネント触ると反映（といいつつ framework のファイル設計が全然不完全...）


