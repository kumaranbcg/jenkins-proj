const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
module.exports = (sequelize, DataTypes) => {
    const vcaActivities = sequelize.define(
        "VCA14_ACTIVITIES",
        {
            VCA14_ACTIVITIES_D: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            reportId: { type: DataTypes.INTEGER, field: "VCA08_REPORT_D" },
            "2015_2016": { type: DataTypes.INTEGER, field: "VCA14_2015_2016_D" },
            "2016_2017": { type: DataTypes.INTEGER, field: "VCA14_2016_2017_D" },
            "2017_2018": { type: DataTypes.INTEGER, field: "VCA14_2017_2018_D" },
            "2018_2019": { type: DataTypes.INTEGER, field: "VCA14_2018_2019_D" },
            "2019_2020": { type: DataTypes.INTEGER, field: "VCA14_2019_2020_D" },
            valueAddedProducts: {
                type: DataTypes.STRING,
                field: "VCA14_VALUE_ADDED_PRODUCTS_N",
                set(valueAddedProducts) {
                    this.setDataValue(
                        "valueAddedProducts",
                        valueAddedProducts && valueAddedProducts.length
                            ? valueAddedProducts.join(",")
                            : null
                    );
                },
                get(valueAddedProducts) {
                    const rawValue = this.getDataValue(valueAddedProducts);
                    const varTypes = rawValue.split(",");
                    return varTypes ? varTypes : null;
                },
            },
            preProductionIssues: {
                type: DataTypes.STRING,
                field: "VCA14_PRE_PRODUCTION_ISSUES_N",
                set(preProductionIssues) {
                    this.setDataValue(
                        "preProductionIssues",
                        preProductionIssues && preProductionIssues.length
                            ? preProductionIssues.join(",")
                            : null
                    );
                },
                get(preProductionIssues) {
                    const rawValue = this.getDataValue(preProductionIssues);
                    const varTypes = rawValue.split(",");
                    return varTypes ? varTypes : null;
                },
            },
            productionIssues: {
                type: DataTypes.STRING,
                field: "VCA14_PRODUCTION_ISSUES_N",
                set(productionIssues) {
                    this.setDataValue(
                        "productionIssues",
                        productionIssues && productionIssues.length
                            ? productionIssues.join(",")
                            : null
                    );
                },
                get(productionIssues) {
                    const rawValue = this.getDataValue(productionIssues);
                    const varTypes = rawValue.split(",");
                    return varTypes ? varTypes : null;
                },
            },
            postProductionIssues: {
                type: DataTypes.STRING,
                field: "VCA14_POST_PRODUCTION_ISSUES_N",
                set(postProductionIssues) {
                    this.setDataValue(
                        "postProductionIssues",
                        postProductionIssues && postProductionIssues.length
                            ? postProductionIssues.join(",")
                            : null
                    );
                },
                get(postProductionIssues) {
                    const rawValue = this.getDataValue(postProductionIssues);
                    const varTypes = rawValue.split(",");
                    return varTypes ? varTypes : null;
                },
            },
            processingIssues: {
                type: DataTypes.STRING,
                field: "VCA14_PROCESSING_ISSUES_N",
                set(processingIssues) {
                    this.setDataValue(
                        "processingIssues",
                        processingIssues && processingIssues.length
                            ? processingIssues.join(",")
                            : null
                    );
                },
                get(processingIssues) {
                    const rawValue = this.getDataValue(processingIssues);
                    const varTypes = rawValue.split(",");
                    return varTypes ? varTypes : null;
                },
            },
            marketingIssues: {
                type: DataTypes.STRING,
                field: "VCA14_MARKETING_ISSUES_N",
                set(marketingIssues) {
                    this.setDataValue(
                        "marketingIssues",
                        marketingIssues && marketingIssues.length ? marketingIssues.join(",") : null
                    );
                },
                get(marketingIssues) {
                    const rawValue = this.getDataValue(marketingIssues);
                    const varTypes = rawValue.split(",");
                    return varTypes ? varTypes : null;
                },
            },
            majorFormCommodities: {
                type: DataTypes.STRING,
                field: "VCA14_MAJOR_FORM_COMMODITIES_N",
                set(majorFormCommodities) {
                    this.setDataValue(
                        "majorFormCommodities",
                        majorFormCommodities && majorFormCommodities.length
                            ? majorFormCommodities.join(",")
                            : null
                    );
                },
                get(majorFormCommodities) {
                    const rawValue = this.getDataValue(majorFormCommodities);
                    const varTypes = rawValue.split(",");
                    return varTypes ? varTypes : null;
                },
            },
            isFilled: { type: DataTypes.BOOLEAN, field: "VCA14_IS_FILLED_D" },
            status: { type: DataTypes.BOOLEAN, field: "VCA14_STATUS_D" },
            VCA14_CREATED_AT: { type: DataTypes.DATE },
            VCA14_UPDATED_AT: { type: DataTypes.DATE },
        },
        { freezeTableName: true, timestamps: false, schema: config.database }
    );
    vcaActivities.associate = function (models) {
        vcaActivities.hasMany(models.vcaActors, {
            foreignKey: "VCA14_ACTIVITIES_D",
            as: "vcaActors",
        });
        vcaActivities.hasMany(models.vcaChannelActors, {
            foreignKey: "VCA14_ACTIVITIES_D",
            as: "vcaChannelActors",
        });
        vcaActivities.hasMany(models.vcaProposedValueChain, {
            foreignKey: "VCA14_ACTIVITIES_D",
            as: "vcaProposedValueChain",
        });
        vcaActivities.hasMany(models.vcaIntervention, {
            foreignKey: "VCA14_ACTIVITIES_D",
            as: "vcaIntervention",
        });
        vcaActivities.hasMany(models.vcaMajorResource, {
            foreignKey: "VCA14_ACTIVITIES_D",
            as: "vcaMajorResource",
        });
        vcaActivities.hasMany(models.vcaLinkages, {
            foreignKey: "VCA14_ACTIVITIES_D",
            as: "vcaLinkages",
        });
    };
    vcaActivities.commonFields = [
        "2015_2016",
        "2016_2017",
        "2017_2018",
        "2018_2019",
        "2019_2020",
        "valueAddedProducts",
        "preProductionIssues",
        "productionIssues",
        "postProductionIssues",
        "processingIssues",
        "marketingIssues",
        "majorFormCommodities",
    ];
    vcaActivities.vcaFarmActivitiesFields = [...vcaActivities.commonFields];
    vcaActivities.vcaOffFarmFisheriesActivitiesFields = [...vcaActivities.commonFields];
    return vcaActivities;
};
