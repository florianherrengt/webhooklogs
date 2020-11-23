
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ***
-- USERS
-- ***
CREATE TABLE "public"."users"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "username" text NOT NULL, "email" text NOT NULL, PRIMARY KEY ("id") );
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_users_updated_at"
BEFORE UPDATE ON "public"."users"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_users_updated_at" ON "public"."users" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

create index users_email on users (email);

-- ***
-- APPLICATIONS
-- ***
CREATE TABLE "public"."applications"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "name" text, "is_proxied" boolean, "users_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON UPDATE cascade ON DELETE cascade);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_application_updated_at"
BEFORE UPDATE ON "public"."applications"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_application_updated_at" ON "public"."applications" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

create index applications_users_id_fk on applications (user_id);

-- ***
-- TARGETS
-- ***
CREATE TABLE "public"."targets"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "url" text NOT NULL, "is_main" boolean NOT NULL, "application_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON UPDATE cascade ON DELETE cascade);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_targets_updated_at"
BEFORE UPDATE ON "public"."targets"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_targets_updated_at" ON "public"."targets" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

create index targets_application_id_fk on targets (application_id);

-- ***
-- EVENTS
-- ***
CREATE TABLE "public"."events"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "method" text NOT NULL, "payload" jsonb NOT NULL, "application_id" uuid NOT NULL, "headers" jsonb NOT NULL, PRIMARY KEY ("id"), FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON UPDATE cascade ON DELETE cascade);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_events_updated_at"
BEFORE UPDATE ON "public"."events"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_events_updated_at" ON "public"."events" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

create index events_application_id_fk on events (application_id);

-- ***
-- TARGETS_RESPONSES
-- ***
CREATE TABLE "public"."targets_responses"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "status" integer NOT NULL, "response" jsonb NOT NULL, "response_time" numeric NOT NULL, "event_id" uuid NOT NULL, "target_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("target_id") REFERENCES "public"."targets"("id") ON UPDATE cascade ON DELETE cascade);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_targets_responses_updated_at"
BEFORE UPDATE ON "public"."targets_responses"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_targets_responses_updated_at" ON "public"."targets_responses" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

create index targets_responses_created_at on targets_responses (created_at);
create index targets_responses_event_id_fk on targets_responses (event_id);
create index targets_responses_target_id_fk on targets_responses (target_id);