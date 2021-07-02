const fs = require('fs');
const path = require('path');
const { ApolloServer } = require('apollo-server');

let people = [{
    name: 'Areg',
    age: 35,
    nameOfFriends: ['John']
},
{
    name: 'John',
    age: 25,
    nameOfFriends: ['Areg']
}]

const resolvers = {
    Query: {
        getUsers: () => people,
        getUserByName: (p, args) => {
            const { name } = args;
            return people.find(person => person.name == name)
        }
    },

    Mutation: {
        post: (args) => {
            const person = {
                name: args.name,
                age: args.age,
                nameOfFriends: args.nameOfFriends
            }
            people.push(person);
            return person;
        }
    }
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
    resolvers
})

server.listen()
    .then(({ url }) => console.log(`Server is running on ${url}`));