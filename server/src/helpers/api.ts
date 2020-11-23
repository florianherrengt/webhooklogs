import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  jsonb: any;
  numeric: any;
  timestamptz: any;
  uuid: any;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "applications" */
export type Applications = {
  __typename?: 'applications';
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  is_proxied?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  /** An array relationship */
  targets: Array<Targets>;
  /** An aggregated array relationship */
  targets_aggregate: Targets_Aggregate;
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  user: Users;
  users_id: Scalars['uuid'];
};


/** columns and relationships of "applications" */
export type ApplicationsTargetsArgs = {
  distinct_on?: Maybe<Array<Targets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Targets_Order_By>>;
  where?: Maybe<Targets_Bool_Exp>;
};


/** columns and relationships of "applications" */
export type ApplicationsTargets_AggregateArgs = {
  distinct_on?: Maybe<Array<Targets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Targets_Order_By>>;
  where?: Maybe<Targets_Bool_Exp>;
};

/** aggregated selection of "applications" */
export type Applications_Aggregate = {
  __typename?: 'applications_aggregate';
  aggregate?: Maybe<Applications_Aggregate_Fields>;
  nodes: Array<Applications>;
};

/** aggregate fields of "applications" */
export type Applications_Aggregate_Fields = {
  __typename?: 'applications_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Applications_Max_Fields>;
  min?: Maybe<Applications_Min_Fields>;
};


/** aggregate fields of "applications" */
export type Applications_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Applications_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "applications" */
export type Applications_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Applications_Max_Order_By>;
  min?: Maybe<Applications_Min_Order_By>;
};

/** input type for inserting array relation for remote table "applications" */
export type Applications_Arr_Rel_Insert_Input = {
  data: Array<Applications_Insert_Input>;
  on_conflict?: Maybe<Applications_On_Conflict>;
};

/** Boolean expression to filter rows from the table "applications". All fields are combined with a logical 'AND'. */
export type Applications_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Applications_Bool_Exp>>>;
  _not?: Maybe<Applications_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Applications_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  is_proxied?: Maybe<Boolean_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  targets?: Maybe<Targets_Bool_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  users_id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "applications" */
export enum Applications_Constraint {
  /** unique or primary key constraint */
  ApplicationsPkey = 'applications_pkey'
}

/** input type for inserting data into table "applications" */
export type Applications_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  is_proxied?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  targets?: Maybe<Targets_Arr_Rel_Insert_Input>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  users_id?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Applications_Max_Fields = {
  __typename?: 'applications_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  users_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "applications" */
export type Applications_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  users_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Applications_Min_Fields = {
  __typename?: 'applications_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  users_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "applications" */
export type Applications_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  users_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "applications" */
export type Applications_Mutation_Response = {
  __typename?: 'applications_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Applications>;
};

/** input type for inserting object relation for remote table "applications" */
export type Applications_Obj_Rel_Insert_Input = {
  data: Applications_Insert_Input;
  on_conflict?: Maybe<Applications_On_Conflict>;
};

/** on conflict condition type for table "applications" */
export type Applications_On_Conflict = {
  constraint: Applications_Constraint;
  update_columns: Array<Applications_Update_Column>;
  where?: Maybe<Applications_Bool_Exp>;
};

/** ordering options when selecting data from "applications" */
export type Applications_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  is_proxied?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  targets_aggregate?: Maybe<Targets_Aggregate_Order_By>;
  updated_at?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  users_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "applications" */
export type Applications_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "applications" */
export enum Applications_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsProxied = 'is_proxied',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UsersId = 'users_id'
}

/** input type for updating data in table "applications" */
export type Applications_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  is_proxied?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  users_id?: Maybe<Scalars['uuid']>;
};

/** update columns of table "applications" */
export enum Applications_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsProxied = 'is_proxied',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UsersId = 'users_id'
}

/** columns and relationships of "events" */
export type Events = {
  __typename?: 'events';
  application_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  headers: Scalars['jsonb'];
  id: Scalars['uuid'];
  method: Scalars['String'];
  payload: Scalars['jsonb'];
  /** An array relationship */
  targets_responses: Array<Targets_Responses>;
  /** An aggregated array relationship */
  targets_responses_aggregate: Targets_Responses_Aggregate;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "events" */
export type EventsHeadersArgs = {
  path?: Maybe<Scalars['String']>;
};


/** columns and relationships of "events" */
export type EventsPayloadArgs = {
  path?: Maybe<Scalars['String']>;
};


/** columns and relationships of "events" */
export type EventsTargets_ResponsesArgs = {
  distinct_on?: Maybe<Array<Targets_Responses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Targets_Responses_Order_By>>;
  where?: Maybe<Targets_Responses_Bool_Exp>;
};


/** columns and relationships of "events" */
export type EventsTargets_Responses_AggregateArgs = {
  distinct_on?: Maybe<Array<Targets_Responses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Targets_Responses_Order_By>>;
  where?: Maybe<Targets_Responses_Bool_Exp>;
};

/** aggregated selection of "events" */
export type Events_Aggregate = {
  __typename?: 'events_aggregate';
  aggregate?: Maybe<Events_Aggregate_Fields>;
  nodes: Array<Events>;
};

/** aggregate fields of "events" */
export type Events_Aggregate_Fields = {
  __typename?: 'events_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Events_Max_Fields>;
  min?: Maybe<Events_Min_Fields>;
};


/** aggregate fields of "events" */
export type Events_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Events_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "events" */
export type Events_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Events_Max_Order_By>;
  min?: Maybe<Events_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Events_Append_Input = {
  headers?: Maybe<Scalars['jsonb']>;
  payload?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "events" */
export type Events_Arr_Rel_Insert_Input = {
  data: Array<Events_Insert_Input>;
  on_conflict?: Maybe<Events_On_Conflict>;
};

/** Boolean expression to filter rows from the table "events". All fields are combined with a logical 'AND'. */
export type Events_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Events_Bool_Exp>>>;
  _not?: Maybe<Events_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Events_Bool_Exp>>>;
  application_id?: Maybe<Uuid_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  headers?: Maybe<Jsonb_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  method?: Maybe<String_Comparison_Exp>;
  payload?: Maybe<Jsonb_Comparison_Exp>;
  targets_responses?: Maybe<Targets_Responses_Bool_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "events" */
export enum Events_Constraint {
  /** unique or primary key constraint */
  EventsPkey = 'events_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Events_Delete_At_Path_Input = {
  headers?: Maybe<Array<Maybe<Scalars['String']>>>;
  payload?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Events_Delete_Elem_Input = {
  headers?: Maybe<Scalars['Int']>;
  payload?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Events_Delete_Key_Input = {
  headers?: Maybe<Scalars['String']>;
  payload?: Maybe<Scalars['String']>;
};

/** input type for inserting data into table "events" */
export type Events_Insert_Input = {
  application_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  headers?: Maybe<Scalars['jsonb']>;
  id?: Maybe<Scalars['uuid']>;
  method?: Maybe<Scalars['String']>;
  payload?: Maybe<Scalars['jsonb']>;
  targets_responses?: Maybe<Targets_Responses_Arr_Rel_Insert_Input>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Events_Max_Fields = {
  __typename?: 'events_max_fields';
  application_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  method?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "events" */
export type Events_Max_Order_By = {
  application_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  method?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Events_Min_Fields = {
  __typename?: 'events_min_fields';
  application_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  method?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "events" */
export type Events_Min_Order_By = {
  application_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  method?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "events" */
export type Events_Mutation_Response = {
  __typename?: 'events_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Events>;
};

/** input type for inserting object relation for remote table "events" */
export type Events_Obj_Rel_Insert_Input = {
  data: Events_Insert_Input;
  on_conflict?: Maybe<Events_On_Conflict>;
};

/** on conflict condition type for table "events" */
export type Events_On_Conflict = {
  constraint: Events_Constraint;
  update_columns: Array<Events_Update_Column>;
  where?: Maybe<Events_Bool_Exp>;
};

/** ordering options when selecting data from "events" */
export type Events_Order_By = {
  application_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  headers?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  method?: Maybe<Order_By>;
  payload?: Maybe<Order_By>;
  targets_responses_aggregate?: Maybe<Targets_Responses_Aggregate_Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: "events" */
export type Events_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Events_Prepend_Input = {
  headers?: Maybe<Scalars['jsonb']>;
  payload?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "events" */
export enum Events_Select_Column {
  /** column name */
  ApplicationId = 'application_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Headers = 'headers',
  /** column name */
  Id = 'id',
  /** column name */
  Method = 'method',
  /** column name */
  Payload = 'payload',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "events" */
export type Events_Set_Input = {
  application_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  headers?: Maybe<Scalars['jsonb']>;
  id?: Maybe<Scalars['uuid']>;
  method?: Maybe<Scalars['String']>;
  payload?: Maybe<Scalars['jsonb']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "events" */
export enum Events_Update_Column {
  /** column name */
  ApplicationId = 'application_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Headers = 'headers',
  /** column name */
  Id = 'id',
  /** column name */
  Method = 'method',
  /** column name */
  Payload = 'payload',
  /** column name */
  UpdatedAt = 'updated_at'
}


/** expression to compare columns of type jsonb. All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: Maybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: Maybe<Scalars['jsonb']>;
  _eq?: Maybe<Scalars['jsonb']>;
  _gt?: Maybe<Scalars['jsonb']>;
  _gte?: Maybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: Maybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: Maybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: Maybe<Array<Scalars['String']>>;
  _in?: Maybe<Array<Scalars['jsonb']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['jsonb']>;
  _lte?: Maybe<Scalars['jsonb']>;
  _neq?: Maybe<Scalars['jsonb']>;
  _nin?: Maybe<Array<Scalars['jsonb']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "applications" */
  delete_applications?: Maybe<Applications_Mutation_Response>;
  /** delete single row from the table: "applications" */
  delete_applications_by_pk?: Maybe<Applications>;
  /** delete data from the table: "events" */
  delete_events?: Maybe<Events_Mutation_Response>;
  /** delete single row from the table: "events" */
  delete_events_by_pk?: Maybe<Events>;
  /** delete data from the table: "targets" */
  delete_targets?: Maybe<Targets_Mutation_Response>;
  /** delete single row from the table: "targets" */
  delete_targets_by_pk?: Maybe<Targets>;
  /** delete data from the table: "targets_responses" */
  delete_targets_responses?: Maybe<Targets_Responses_Mutation_Response>;
  /** delete single row from the table: "targets_responses" */
  delete_targets_responses_by_pk?: Maybe<Targets_Responses>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "applications" */
  insert_applications?: Maybe<Applications_Mutation_Response>;
  /** insert a single row into the table: "applications" */
  insert_applications_one?: Maybe<Applications>;
  /** insert data into the table: "events" */
  insert_events?: Maybe<Events_Mutation_Response>;
  /** insert a single row into the table: "events" */
  insert_events_one?: Maybe<Events>;
  /** insert data into the table: "targets" */
  insert_targets?: Maybe<Targets_Mutation_Response>;
  /** insert a single row into the table: "targets" */
  insert_targets_one?: Maybe<Targets>;
  /** insert data into the table: "targets_responses" */
  insert_targets_responses?: Maybe<Targets_Responses_Mutation_Response>;
  /** insert a single row into the table: "targets_responses" */
  insert_targets_responses_one?: Maybe<Targets_Responses>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "applications" */
  update_applications?: Maybe<Applications_Mutation_Response>;
  /** update single row of the table: "applications" */
  update_applications_by_pk?: Maybe<Applications>;
  /** update data of the table: "events" */
  update_events?: Maybe<Events_Mutation_Response>;
  /** update single row of the table: "events" */
  update_events_by_pk?: Maybe<Events>;
  /** update data of the table: "targets" */
  update_targets?: Maybe<Targets_Mutation_Response>;
  /** update single row of the table: "targets" */
  update_targets_by_pk?: Maybe<Targets>;
  /** update data of the table: "targets_responses" */
  update_targets_responses?: Maybe<Targets_Responses_Mutation_Response>;
  /** update single row of the table: "targets_responses" */
  update_targets_responses_by_pk?: Maybe<Targets_Responses>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
};


/** mutation root */
export type Mutation_RootDelete_ApplicationsArgs = {
  where: Applications_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Applications_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_EventsArgs = {
  where: Events_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Events_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_TargetsArgs = {
  where: Targets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Targets_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Targets_ResponsesArgs = {
  where: Targets_Responses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Targets_Responses_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_ApplicationsArgs = {
  objects: Array<Applications_Insert_Input>;
  on_conflict?: Maybe<Applications_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Applications_OneArgs = {
  object: Applications_Insert_Input;
  on_conflict?: Maybe<Applications_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_EventsArgs = {
  objects: Array<Events_Insert_Input>;
  on_conflict?: Maybe<Events_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Events_OneArgs = {
  object: Events_Insert_Input;
  on_conflict?: Maybe<Events_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TargetsArgs = {
  objects: Array<Targets_Insert_Input>;
  on_conflict?: Maybe<Targets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Targets_OneArgs = {
  object: Targets_Insert_Input;
  on_conflict?: Maybe<Targets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Targets_ResponsesArgs = {
  objects: Array<Targets_Responses_Insert_Input>;
  on_conflict?: Maybe<Targets_Responses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Targets_Responses_OneArgs = {
  object: Targets_Responses_Insert_Input;
  on_conflict?: Maybe<Targets_Responses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_ApplicationsArgs = {
  _set?: Maybe<Applications_Set_Input>;
  where: Applications_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Applications_By_PkArgs = {
  _set?: Maybe<Applications_Set_Input>;
  pk_columns: Applications_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_EventsArgs = {
  _append?: Maybe<Events_Append_Input>;
  _delete_at_path?: Maybe<Events_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Events_Delete_Elem_Input>;
  _delete_key?: Maybe<Events_Delete_Key_Input>;
  _prepend?: Maybe<Events_Prepend_Input>;
  _set?: Maybe<Events_Set_Input>;
  where: Events_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Events_By_PkArgs = {
  _append?: Maybe<Events_Append_Input>;
  _delete_at_path?: Maybe<Events_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Events_Delete_Elem_Input>;
  _delete_key?: Maybe<Events_Delete_Key_Input>;
  _prepend?: Maybe<Events_Prepend_Input>;
  _set?: Maybe<Events_Set_Input>;
  pk_columns: Events_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_TargetsArgs = {
  _set?: Maybe<Targets_Set_Input>;
  where: Targets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Targets_By_PkArgs = {
  _set?: Maybe<Targets_Set_Input>;
  pk_columns: Targets_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Targets_ResponsesArgs = {
  _append?: Maybe<Targets_Responses_Append_Input>;
  _delete_at_path?: Maybe<Targets_Responses_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Targets_Responses_Delete_Elem_Input>;
  _delete_key?: Maybe<Targets_Responses_Delete_Key_Input>;
  _inc?: Maybe<Targets_Responses_Inc_Input>;
  _prepend?: Maybe<Targets_Responses_Prepend_Input>;
  _set?: Maybe<Targets_Responses_Set_Input>;
  where: Targets_Responses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Targets_Responses_By_PkArgs = {
  _append?: Maybe<Targets_Responses_Append_Input>;
  _delete_at_path?: Maybe<Targets_Responses_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Targets_Responses_Delete_Elem_Input>;
  _delete_key?: Maybe<Targets_Responses_Delete_Key_Input>;
  _inc?: Maybe<Targets_Responses_Inc_Input>;
  _prepend?: Maybe<Targets_Responses_Prepend_Input>;
  _set?: Maybe<Targets_Responses_Set_Input>;
  pk_columns: Targets_Responses_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** expression to compare columns of type numeric. All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: Maybe<Scalars['numeric']>;
  _gt?: Maybe<Scalars['numeric']>;
  _gte?: Maybe<Scalars['numeric']>;
  _in?: Maybe<Array<Scalars['numeric']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['numeric']>;
  _lte?: Maybe<Scalars['numeric']>;
  _neq?: Maybe<Scalars['numeric']>;
  _nin?: Maybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "applications" */
  applications: Array<Applications>;
  /** fetch aggregated fields from the table: "applications" */
  applications_aggregate: Applications_Aggregate;
  /** fetch data from the table: "applications" using primary key columns */
  applications_by_pk?: Maybe<Applications>;
  /** fetch data from the table: "events" */
  events: Array<Events>;
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate;
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk?: Maybe<Events>;
  /** fetch data from the table: "targets" */
  targets: Array<Targets>;
  /** fetch aggregated fields from the table: "targets" */
  targets_aggregate: Targets_Aggregate;
  /** fetch data from the table: "targets" using primary key columns */
  targets_by_pk?: Maybe<Targets>;
  /** fetch data from the table: "targets_responses" */
  targets_responses: Array<Targets_Responses>;
  /** fetch aggregated fields from the table: "targets_responses" */
  targets_responses_aggregate: Targets_Responses_Aggregate;
  /** fetch data from the table: "targets_responses" using primary key columns */
  targets_responses_by_pk?: Maybe<Targets_Responses>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** query root */
export type Query_RootApplicationsArgs = {
  distinct_on?: Maybe<Array<Applications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Applications_Order_By>>;
  where?: Maybe<Applications_Bool_Exp>;
};


/** query root */
export type Query_RootApplications_AggregateArgs = {
  distinct_on?: Maybe<Array<Applications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Applications_Order_By>>;
  where?: Maybe<Applications_Bool_Exp>;
};


/** query root */
export type Query_RootApplications_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootEventsArgs = {
  distinct_on?: Maybe<Array<Events_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Order_By>>;
  where?: Maybe<Events_Bool_Exp>;
};


/** query root */
export type Query_RootEvents_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Order_By>>;
  where?: Maybe<Events_Bool_Exp>;
};


/** query root */
export type Query_RootEvents_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootTargetsArgs = {
  distinct_on?: Maybe<Array<Targets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Targets_Order_By>>;
  where?: Maybe<Targets_Bool_Exp>;
};


/** query root */
export type Query_RootTargets_AggregateArgs = {
  distinct_on?: Maybe<Array<Targets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Targets_Order_By>>;
  where?: Maybe<Targets_Bool_Exp>;
};


/** query root */
export type Query_RootTargets_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootTargets_ResponsesArgs = {
  distinct_on?: Maybe<Array<Targets_Responses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Targets_Responses_Order_By>>;
  where?: Maybe<Targets_Responses_Bool_Exp>;
};


/** query root */
export type Query_RootTargets_Responses_AggregateArgs = {
  distinct_on?: Maybe<Array<Targets_Responses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Targets_Responses_Order_By>>;
  where?: Maybe<Targets_Responses_Bool_Exp>;
};


/** query root */
export type Query_RootTargets_Responses_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "applications" */
  applications: Array<Applications>;
  /** fetch aggregated fields from the table: "applications" */
  applications_aggregate: Applications_Aggregate;
  /** fetch data from the table: "applications" using primary key columns */
  applications_by_pk?: Maybe<Applications>;
  /** fetch data from the table: "events" */
  events: Array<Events>;
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate;
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk?: Maybe<Events>;
  /** fetch data from the table: "targets" */
  targets: Array<Targets>;
  /** fetch aggregated fields from the table: "targets" */
  targets_aggregate: Targets_Aggregate;
  /** fetch data from the table: "targets" using primary key columns */
  targets_by_pk?: Maybe<Targets>;
  /** fetch data from the table: "targets_responses" */
  targets_responses: Array<Targets_Responses>;
  /** fetch aggregated fields from the table: "targets_responses" */
  targets_responses_aggregate: Targets_Responses_Aggregate;
  /** fetch data from the table: "targets_responses" using primary key columns */
  targets_responses_by_pk?: Maybe<Targets_Responses>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** subscription root */
export type Subscription_RootApplicationsArgs = {
  distinct_on?: Maybe<Array<Applications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Applications_Order_By>>;
  where?: Maybe<Applications_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootApplications_AggregateArgs = {
  distinct_on?: Maybe<Array<Applications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Applications_Order_By>>;
  where?: Maybe<Applications_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootApplications_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootEventsArgs = {
  distinct_on?: Maybe<Array<Events_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Order_By>>;
  where?: Maybe<Events_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootEvents_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Order_By>>;
  where?: Maybe<Events_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootEvents_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootTargetsArgs = {
  distinct_on?: Maybe<Array<Targets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Targets_Order_By>>;
  where?: Maybe<Targets_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTargets_AggregateArgs = {
  distinct_on?: Maybe<Array<Targets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Targets_Order_By>>;
  where?: Maybe<Targets_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTargets_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootTargets_ResponsesArgs = {
  distinct_on?: Maybe<Array<Targets_Responses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Targets_Responses_Order_By>>;
  where?: Maybe<Targets_Responses_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTargets_Responses_AggregateArgs = {
  distinct_on?: Maybe<Array<Targets_Responses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Targets_Responses_Order_By>>;
  where?: Maybe<Targets_Responses_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTargets_Responses_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "targets" */
export type Targets = {
  __typename?: 'targets';
  /** An object relationship */
  application: Applications;
  application_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  is_main: Scalars['Boolean'];
  /** An array relationship */
  targets_responses: Array<Targets_Responses>;
  /** An aggregated array relationship */
  targets_responses_aggregate: Targets_Responses_Aggregate;
  updated_at: Scalars['timestamptz'];
  url: Scalars['String'];
};


/** columns and relationships of "targets" */
export type TargetsTargets_ResponsesArgs = {
  distinct_on?: Maybe<Array<Targets_Responses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Targets_Responses_Order_By>>;
  where?: Maybe<Targets_Responses_Bool_Exp>;
};


/** columns and relationships of "targets" */
export type TargetsTargets_Responses_AggregateArgs = {
  distinct_on?: Maybe<Array<Targets_Responses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Targets_Responses_Order_By>>;
  where?: Maybe<Targets_Responses_Bool_Exp>;
};

/** aggregated selection of "targets" */
export type Targets_Aggregate = {
  __typename?: 'targets_aggregate';
  aggregate?: Maybe<Targets_Aggregate_Fields>;
  nodes: Array<Targets>;
};

/** aggregate fields of "targets" */
export type Targets_Aggregate_Fields = {
  __typename?: 'targets_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Targets_Max_Fields>;
  min?: Maybe<Targets_Min_Fields>;
};


/** aggregate fields of "targets" */
export type Targets_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Targets_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "targets" */
export type Targets_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Targets_Max_Order_By>;
  min?: Maybe<Targets_Min_Order_By>;
};

/** input type for inserting array relation for remote table "targets" */
export type Targets_Arr_Rel_Insert_Input = {
  data: Array<Targets_Insert_Input>;
  on_conflict?: Maybe<Targets_On_Conflict>;
};

/** Boolean expression to filter rows from the table "targets". All fields are combined with a logical 'AND'. */
export type Targets_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Targets_Bool_Exp>>>;
  _not?: Maybe<Targets_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Targets_Bool_Exp>>>;
  application?: Maybe<Applications_Bool_Exp>;
  application_id?: Maybe<Uuid_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  is_main?: Maybe<Boolean_Comparison_Exp>;
  targets_responses?: Maybe<Targets_Responses_Bool_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  url?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "targets" */
export enum Targets_Constraint {
  /** unique or primary key constraint */
  TargetsPkey = 'targets_pkey'
}

/** input type for inserting data into table "targets" */
export type Targets_Insert_Input = {
  application?: Maybe<Applications_Obj_Rel_Insert_Input>;
  application_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  is_main?: Maybe<Scalars['Boolean']>;
  targets_responses?: Maybe<Targets_Responses_Arr_Rel_Insert_Input>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Targets_Max_Fields = {
  __typename?: 'targets_max_fields';
  application_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "targets" */
export type Targets_Max_Order_By = {
  application_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Targets_Min_Fields = {
  __typename?: 'targets_min_fields';
  application_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "targets" */
export type Targets_Min_Order_By = {
  application_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
};

/** response of any mutation on the table "targets" */
export type Targets_Mutation_Response = {
  __typename?: 'targets_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Targets>;
};

/** input type for inserting object relation for remote table "targets" */
export type Targets_Obj_Rel_Insert_Input = {
  data: Targets_Insert_Input;
  on_conflict?: Maybe<Targets_On_Conflict>;
};

/** on conflict condition type for table "targets" */
export type Targets_On_Conflict = {
  constraint: Targets_Constraint;
  update_columns: Array<Targets_Update_Column>;
  where?: Maybe<Targets_Bool_Exp>;
};

/** ordering options when selecting data from "targets" */
export type Targets_Order_By = {
  application?: Maybe<Applications_Order_By>;
  application_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  is_main?: Maybe<Order_By>;
  targets_responses_aggregate?: Maybe<Targets_Responses_Aggregate_Order_By>;
  updated_at?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
};

/** primary key columns input for table: "targets" */
export type Targets_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** columns and relationships of "targets_responses" */
export type Targets_Responses = {
  __typename?: 'targets_responses';
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  event: Events;
  event_id: Scalars['uuid'];
  id: Scalars['uuid'];
  response: Scalars['jsonb'];
  response_time: Scalars['numeric'];
  status: Scalars['Int'];
  /** An object relationship */
  target: Targets;
  targets_id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "targets_responses" */
export type Targets_ResponsesResponseArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "targets_responses" */
export type Targets_Responses_Aggregate = {
  __typename?: 'targets_responses_aggregate';
  aggregate?: Maybe<Targets_Responses_Aggregate_Fields>;
  nodes: Array<Targets_Responses>;
};

/** aggregate fields of "targets_responses" */
export type Targets_Responses_Aggregate_Fields = {
  __typename?: 'targets_responses_aggregate_fields';
  avg?: Maybe<Targets_Responses_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Targets_Responses_Max_Fields>;
  min?: Maybe<Targets_Responses_Min_Fields>;
  stddev?: Maybe<Targets_Responses_Stddev_Fields>;
  stddev_pop?: Maybe<Targets_Responses_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Targets_Responses_Stddev_Samp_Fields>;
  sum?: Maybe<Targets_Responses_Sum_Fields>;
  var_pop?: Maybe<Targets_Responses_Var_Pop_Fields>;
  var_samp?: Maybe<Targets_Responses_Var_Samp_Fields>;
  variance?: Maybe<Targets_Responses_Variance_Fields>;
};


/** aggregate fields of "targets_responses" */
export type Targets_Responses_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Targets_Responses_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "targets_responses" */
export type Targets_Responses_Aggregate_Order_By = {
  avg?: Maybe<Targets_Responses_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Targets_Responses_Max_Order_By>;
  min?: Maybe<Targets_Responses_Min_Order_By>;
  stddev?: Maybe<Targets_Responses_Stddev_Order_By>;
  stddev_pop?: Maybe<Targets_Responses_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Targets_Responses_Stddev_Samp_Order_By>;
  sum?: Maybe<Targets_Responses_Sum_Order_By>;
  var_pop?: Maybe<Targets_Responses_Var_Pop_Order_By>;
  var_samp?: Maybe<Targets_Responses_Var_Samp_Order_By>;
  variance?: Maybe<Targets_Responses_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Targets_Responses_Append_Input = {
  response?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "targets_responses" */
export type Targets_Responses_Arr_Rel_Insert_Input = {
  data: Array<Targets_Responses_Insert_Input>;
  on_conflict?: Maybe<Targets_Responses_On_Conflict>;
};

/** aggregate avg on columns */
export type Targets_Responses_Avg_Fields = {
  __typename?: 'targets_responses_avg_fields';
  response_time?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "targets_responses" */
export type Targets_Responses_Avg_Order_By = {
  response_time?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "targets_responses". All fields are combined with a logical 'AND'. */
export type Targets_Responses_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Targets_Responses_Bool_Exp>>>;
  _not?: Maybe<Targets_Responses_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Targets_Responses_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  event?: Maybe<Events_Bool_Exp>;
  event_id?: Maybe<Uuid_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  response?: Maybe<Jsonb_Comparison_Exp>;
  response_time?: Maybe<Numeric_Comparison_Exp>;
  status?: Maybe<Int_Comparison_Exp>;
  target?: Maybe<Targets_Bool_Exp>;
  targets_id?: Maybe<Uuid_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "targets_responses" */
export enum Targets_Responses_Constraint {
  /** unique or primary key constraint */
  TargetsResponsesPkey = 'targets_responses_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Targets_Responses_Delete_At_Path_Input = {
  response?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Targets_Responses_Delete_Elem_Input = {
  response?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Targets_Responses_Delete_Key_Input = {
  response?: Maybe<Scalars['String']>;
};

/** input type for incrementing integer column in table "targets_responses" */
export type Targets_Responses_Inc_Input = {
  response_time?: Maybe<Scalars['numeric']>;
  status?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "targets_responses" */
export type Targets_Responses_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  event?: Maybe<Events_Obj_Rel_Insert_Input>;
  event_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  response?: Maybe<Scalars['jsonb']>;
  response_time?: Maybe<Scalars['numeric']>;
  status?: Maybe<Scalars['Int']>;
  target?: Maybe<Targets_Obj_Rel_Insert_Input>;
  targets_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Targets_Responses_Max_Fields = {
  __typename?: 'targets_responses_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  event_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  response_time?: Maybe<Scalars['numeric']>;
  status?: Maybe<Scalars['Int']>;
  targets_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "targets_responses" */
export type Targets_Responses_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  event_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  response_time?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  targets_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Targets_Responses_Min_Fields = {
  __typename?: 'targets_responses_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  event_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  response_time?: Maybe<Scalars['numeric']>;
  status?: Maybe<Scalars['Int']>;
  targets_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "targets_responses" */
export type Targets_Responses_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  event_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  response_time?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  targets_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "targets_responses" */
export type Targets_Responses_Mutation_Response = {
  __typename?: 'targets_responses_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Targets_Responses>;
};

/** input type for inserting object relation for remote table "targets_responses" */
export type Targets_Responses_Obj_Rel_Insert_Input = {
  data: Targets_Responses_Insert_Input;
  on_conflict?: Maybe<Targets_Responses_On_Conflict>;
};

/** on conflict condition type for table "targets_responses" */
export type Targets_Responses_On_Conflict = {
  constraint: Targets_Responses_Constraint;
  update_columns: Array<Targets_Responses_Update_Column>;
  where?: Maybe<Targets_Responses_Bool_Exp>;
};

/** ordering options when selecting data from "targets_responses" */
export type Targets_Responses_Order_By = {
  created_at?: Maybe<Order_By>;
  event?: Maybe<Events_Order_By>;
  event_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  response?: Maybe<Order_By>;
  response_time?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  target?: Maybe<Targets_Order_By>;
  targets_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: "targets_responses" */
export type Targets_Responses_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Targets_Responses_Prepend_Input = {
  response?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "targets_responses" */
export enum Targets_Responses_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id',
  /** column name */
  Response = 'response',
  /** column name */
  ResponseTime = 'response_time',
  /** column name */
  Status = 'status',
  /** column name */
  TargetsId = 'targets_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "targets_responses" */
export type Targets_Responses_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  event_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  response?: Maybe<Scalars['jsonb']>;
  response_time?: Maybe<Scalars['numeric']>;
  status?: Maybe<Scalars['Int']>;
  targets_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Targets_Responses_Stddev_Fields = {
  __typename?: 'targets_responses_stddev_fields';
  response_time?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "targets_responses" */
export type Targets_Responses_Stddev_Order_By = {
  response_time?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Targets_Responses_Stddev_Pop_Fields = {
  __typename?: 'targets_responses_stddev_pop_fields';
  response_time?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "targets_responses" */
export type Targets_Responses_Stddev_Pop_Order_By = {
  response_time?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Targets_Responses_Stddev_Samp_Fields = {
  __typename?: 'targets_responses_stddev_samp_fields';
  response_time?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "targets_responses" */
export type Targets_Responses_Stddev_Samp_Order_By = {
  response_time?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Targets_Responses_Sum_Fields = {
  __typename?: 'targets_responses_sum_fields';
  response_time?: Maybe<Scalars['numeric']>;
  status?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "targets_responses" */
export type Targets_Responses_Sum_Order_By = {
  response_time?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
};

/** update columns of table "targets_responses" */
export enum Targets_Responses_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id',
  /** column name */
  Response = 'response',
  /** column name */
  ResponseTime = 'response_time',
  /** column name */
  Status = 'status',
  /** column name */
  TargetsId = 'targets_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Targets_Responses_Var_Pop_Fields = {
  __typename?: 'targets_responses_var_pop_fields';
  response_time?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "targets_responses" */
export type Targets_Responses_Var_Pop_Order_By = {
  response_time?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Targets_Responses_Var_Samp_Fields = {
  __typename?: 'targets_responses_var_samp_fields';
  response_time?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "targets_responses" */
export type Targets_Responses_Var_Samp_Order_By = {
  response_time?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Targets_Responses_Variance_Fields = {
  __typename?: 'targets_responses_variance_fields';
  response_time?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "targets_responses" */
export type Targets_Responses_Variance_Order_By = {
  response_time?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
};

/** select columns of table "targets" */
export enum Targets_Select_Column {
  /** column name */
  ApplicationId = 'application_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsMain = 'is_main',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Url = 'url'
}

/** input type for updating data in table "targets" */
export type Targets_Set_Input = {
  application_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  is_main?: Maybe<Scalars['Boolean']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
};

/** update columns of table "targets" */
export enum Targets_Update_Column {
  /** column name */
  ApplicationId = 'application_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsMain = 'is_main',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Url = 'url'
}


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  /** An array relationship */
  applications: Array<Applications>;
  /** An aggregated array relationship */
  applications_aggregate: Applications_Aggregate;
  created_at: Scalars['timestamptz'];
  email: Scalars['String'];
  id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
  usersname: Scalars['String'];
};


/** columns and relationships of "users" */
export type UsersApplicationsArgs = {
  distinct_on?: Maybe<Array<Applications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Applications_Order_By>>;
  where?: Maybe<Applications_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersApplications_AggregateArgs = {
  distinct_on?: Maybe<Array<Applications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Applications_Order_By>>;
  where?: Maybe<Applications_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Users_Max_Order_By>;
  min?: Maybe<Users_Min_Order_By>;
};

/** input type for inserting array relation for remote table "users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  applications?: Maybe<Applications_Bool_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  usersname?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  applications?: Maybe<Applications_Arr_Rel_Insert_Input>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  usersname?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  usersname?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  usersname?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  usersname?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  usersname?: Maybe<Order_By>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns: Array<Users_Update_Column>;
  where?: Maybe<Users_Bool_Exp>;
};

/** ordering options when selecting data from "users" */
export type Users_Order_By = {
  applications_aggregate?: Maybe<Applications_Aggregate_Order_By>;
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  usersname?: Maybe<Order_By>;
};

/** primary key columns input for table: "users" */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Usersname = 'usersname'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  usersname?: Maybe<Scalars['String']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Usersname = 'usersname'
}


/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

export type GetApplicationByIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetApplicationByIdQuery = (
  { __typename?: 'query_root' }
  & { applications_by_pk?: Maybe<(
    { __typename?: 'applications' }
    & Pick<Applications, 'id'>
    & { targets: Array<(
      { __typename?: 'targets' }
      & Pick<Targets, 'id' | 'url'>
    )> }
  )> }
);

export type InsertEventMutationVariables = Exact<{
  object: Events_Insert_Input;
}>;


export type InsertEventMutation = (
  { __typename?: 'mutation_root' }
  & { insert_events_one?: Maybe<(
    { __typename?: 'events' }
    & Pick<Events, 'id'>
  )> }
);

export type InsertTargetResponsesMutationVariables = Exact<{
  objects: Array<Targets_Responses_Insert_Input>;
}>;


export type InsertTargetResponsesMutation = (
  { __typename?: 'mutation_root' }
  & { insert_targets_responses?: Maybe<(
    { __typename?: 'targets_responses_mutation_response' }
    & { returning: Array<(
      { __typename?: 'targets_responses' }
      & Pick<Targets_Responses, 'id'>
    )> }
  )> }
);


export const GetApplicationByIdDocument = gql`
    query getApplicationById($id: uuid!) {
  applications_by_pk(id: $id) {
    id
    targets {
      id
      url
    }
  }
}
    `;
export const InsertEventDocument = gql`
    mutation insertEvent($object: events_insert_input!) {
  insert_events_one(object: $object) {
    id
  }
}
    `;
export const InsertTargetResponsesDocument = gql`
    mutation insertTargetResponses($objects: [targets_responses_insert_input!]!) {
  insert_targets_responses(objects: $objects) {
    returning {
      id
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getApplicationById(variables: GetApplicationByIdQueryVariables): Promise<GetApplicationByIdQuery> {
      return withWrapper(() => client.request<GetApplicationByIdQuery>(print(GetApplicationByIdDocument), variables));
    },
    insertEvent(variables: InsertEventMutationVariables): Promise<InsertEventMutation> {
      return withWrapper(() => client.request<InsertEventMutation>(print(InsertEventDocument), variables));
    },
    insertTargetResponses(variables: InsertTargetResponsesMutationVariables): Promise<InsertTargetResponsesMutation> {
      return withWrapper(() => client.request<InsertTargetResponsesMutation>(print(InsertTargetResponsesDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;