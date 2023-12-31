const { ApolloServer, gql } = require("apollo-server");

const books = [
    {
        title: "吾輩は猫である",
        author: "夏目漱石",
    },
    {
        title: "走れメロス",
        author: "太宰治",
    },
]

// どういうふうにAPiに対して問い合わせをするのかを設定
const typeDefs = gql`
    # 型の定義
    type Book {
        title: String
        author: String
    }
    # testというクエリを投げかけると上記のBookを配列として取得するように設定している。
    type Query {
        test: [Book]
    }
`;

// 実際にQueryのtestが呼ばれたらどんな値を返すのかを設定
const resolvers = {
    // クエリが呼ばれたらtestが呼ばれて（関数と同じ感じ）、booksを返すようにしている。
    Query: {
        test: () => books,
    }
}

// 設定したQueryをApolloで使えるように記述
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`server ready at ${url}`)
})