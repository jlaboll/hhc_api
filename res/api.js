const hedgehogs = [
    {
        id: 1,
        name: "Desmond"
    },
    {
        id: 2,
        name: "Dorito"
    },
    {
        id: 3,
        name: "Cheeto"
    },
    {
        id: 4,
        name: "Penelope"
    }
];

const getAllHedgehogs = async (request, response) => {
    response.status(200).json(hedgehogs);
};