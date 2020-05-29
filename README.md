# media_platform
note, qiita系のやつ

## 使うやつ
- express
- postgres
- sequelize
- 後々docker

## URIの構成
|メソッド|パスとクエリ|view|処理内容
|:--|:--|:--|:--
|GET|/|index|投稿一覧
|GET|/notes/add/new|newPost|投稿ページ
|POST|/notes/create|-|投稿
|GET|/notes/:id([0-9]+|show|記事の詳細
|GET|/notes/:id/edit|edit|編集ページ
|PUT|/notes/:id|-|編集
|POST|/notes?delete=1|-|削除
|GET|/logout|-|ログアウト

## モジュール設計
|ファイルパス|モジュールの役割
|:--|:--
|app.js|HTTP サーバーを起動する
|router/router.js|リクエストを処理を行うハンドラに振り分ける
|lib/posts-handler.js|/posts のリクエストメソッドを処理する
|lib/handler-utils.js|その他のリクエストを処理する
|lib/post.js|投稿を追加、取得、削除する

## よくある質問
Q. フレームワークはつかいますか

A. 当然使います。

Q. 他の人はノンフレームワークでやってますが...

A. 今回はDB触ってみるのが目的なんでいいんです。

Q. 何ができますか

A. 開発者がテスト用に作った記事をみれます。ただベーシック認証を採用しているためそれを抜けないといけません。

Q. アプリケーション起動方法を教えてください。

A. クローンして`npm start`でいけます。