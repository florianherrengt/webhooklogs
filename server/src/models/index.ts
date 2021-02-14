import { Sequelize, Model, DataTypes } from "sequelize";
import { Application } from "./Application";

import { HookEvent } from "./HookEvent";
import { TargetResponse } from "./TargetResponse";
import { User } from "./User";

Application.belongsTo(User, {
    foreignKey: "user_id",
});

HookEvent.belongsTo(Application, {
    foreignKey: "application_id",
});

TargetResponse.belongsTo(HookEvent, {
    foreignKey: "hook_event_id",
});

export * from "./HookEvent";
export * from "./Application";
export * from "./User";
export * from "./TargetResponse";
export * from "./sequelize";
