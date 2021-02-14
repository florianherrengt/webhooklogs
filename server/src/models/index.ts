import { Sequelize, Model, DataTypes } from "sequelize";
export const sequelize = new Sequelize("sqlite::memory:", { logging: false });
import { HookEvent } from "./HookEvent";
import { TargetResponse } from "./TargetResponse";

TargetResponse.belongsTo(HookEvent, {
    foreignKey: "hook_event_id",
});

export * from "./HookEvent";
export * from "./Application";
export * from "./User";
export * from "./TargetResponse";
