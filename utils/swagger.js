const options = {
    explorer: true,
    swaggerOptions: {
        persistAuthorization: true,
        urls: [
            {
                url: "/public/swagger/masters.json",
                name: "Master APIs",
            },
            {
                url: "/public/swagger/vcaCommon.json",
                name: "VCA Common APIs",
            },
            {
                url: "/public/swagger/vcaFarm.json",
                name: "VCA Farm APIs",
            },
            {
                url: "/public/swagger/vcaOffFarmDairy.json",
                name: "VCA Off Farm Dairy APIs",
            },
            {
                url: "/public/swagger/vcaOffFarmFisheries.json",
                name: "VCA Off Farm Fisheries APIs",
            },
        ],
    },
};
module.exports = options;
