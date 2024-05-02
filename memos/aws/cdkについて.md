# cdk

## cloudwatch
- cloudwatch用のスタックを定義していなくても、自動でlambdaのロググループが作成される
    - 実装側にログ出力処理がない場合も、lambdaのSTART/ENDやRuntime Errorなどのログは流れる

## lambda
- NodeFunctionを使用する場合はesbuildをインストールする
    - esbuildがないとdockerでビルドしようとしてエラーになる