SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8

SET statement_timeout = 0;

SET lock_timeout = 0;

SET idle_in_transaction_session_timeout = 0;

SET client_encoding = 'UTF8';

SET standard_conforming_strings = on;

SELECT pg_catalog.set_config ('search_path', '', false);

SET check_function_bodies = false;

SET xmloption = content;

SET client_min_messages = warning;

SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO
    "auth"."audit_log_entries" (
        "instance_id",
        "id",
        "payload",
        "created_at",
        "ip_address"
    )
VALUES (
        '00000000-0000-0000-0000-000000000000',
        '48b62821-1c8e-46b9-bfbf-b342acacbf5c',
        '{"action":"user_confirmation_requested","actor_id":"4f4b4d6f-1607-4029-9984-6e3548958747","actor_name":"Loop Test","actor_username":"loops@test.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}',
        '2025-07-04 05:12:22.136685+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '39aabe81-661b-4471-abe1-0b7d0a761e13',
        '{"action":"user_signedup","actor_id":"4f4b4d6f-1607-4029-9984-6e3548958747","actor_name":"Loop Test","actor_username":"loops@test.com","actor_via_sso":false,"log_type":"team"}',
        '2025-07-04 05:12:43.451699+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '24b94c8b-b45e-452a-a443-dbd104d4406f',
        '{"action":"user_confirmation_requested","actor_id":"a8ec7224-b02b-4d5f-9c0e-dffc12eea0e5","actor_username":"admin@email.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}',
        '2025-07-04 06:07:03.602697+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        'd50a780f-df15-4ba0-aa4b-da3841220d4d',
        '{"action":"user_signedup","actor_id":"a8ec7224-b02b-4d5f-9c0e-dffc12eea0e5","actor_username":"admin@email.com","actor_via_sso":false,"log_type":"team"}',
        '2025-07-04 06:07:10.672387+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '4a0c3694-4b11-43c3-8b5c-d2338238cdf9',
        '{"action":"user_confirmation_requested","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}',
        '2025-07-04 16:58:23.615698+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        'e0f79539-eb4f-4d28-9be2-3b562d774b9a',
        '{"action":"user_signedup","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"team"}',
        '2025-07-04 16:58:36.383924+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '5826d631-4352-4b85-971c-976565bf8563',
        '{"action":"user_recovery_requested","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"user"}',
        '2025-07-04 20:59:13.965651+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '97336ea3-a63b-4296-ae4a-9113e4d58b32',
        '{"action":"login","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"account"}',
        '2025-07-04 20:59:20.568495+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '2d833298-8f8a-457d-a04d-ecdc0da57a5b',
        '{"action":"logout","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"account"}',
        '2025-07-04 21:17:53.730346+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        'ab0e1a3e-abf6-4eef-889b-921cb7c97056',
        '{"action":"user_recovery_requested","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"user"}',
        '2025-07-05 16:51:18.963769+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '227248a6-15ea-4d6b-bd8f-8b03a7bd9685',
        '{"action":"login","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"account"}',
        '2025-07-05 16:51:28.043074+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '0bfda2b9-467f-4283-b3fd-fd4247172ee0',
        '{"action":"user_recovery_requested","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"user"}',
        '2025-07-11 22:02:54.86619+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        'd2783ffc-fe44-4bb4-8ac7-1fa64a4d2b22',
        '{"action":"login","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"account"}',
        '2025-07-11 22:03:44.661296+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '49082c10-fcfd-46db-bccb-e288f3621475',
        '{"action":"token_refreshed","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"token"}',
        '2025-07-14 15:05:57.117214+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '255d5163-bfb3-47b0-ae48-422b77c3fcfa',
        '{"action":"token_revoked","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"token"}',
        '2025-07-14 15:05:57.118553+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        'f6a3dbc2-d213-4ba3-a1b8-6c5f44362418',
        '{"action":"user_recovery_requested","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"user"}',
        '2025-07-18 14:25:58.126489+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '70fa1967-277b-4b70-8c8b-a0f764081925',
        '{"action":"login","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"account"}',
        '2025-07-18 14:26:09.537808+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        'eb9ce622-7111-4552-adc4-1a0eb148942c',
        '{"action":"user_recovery_requested","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"user"}',
        '2025-07-18 18:22:19.600606+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        'f36fdd38-197f-4dd4-80d8-f496b10a5b96',
        '{"action":"login","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"account"}',
        '2025-07-18 18:22:41.548278+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '6c367754-a797-4d31-ac63-3fd5d3b897b8',
        '{"action":"token_refreshed","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"token"}',
        '2025-07-23 01:59:03.623+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '73906199-98d3-4529-b776-c020029ff8cc',
        '{"action":"token_revoked","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"token"}',
        '2025-07-23 01:59:03.624577+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '1e05eedd-50d0-4441-984b-f599b59dc910',
        '{"action":"token_refreshed","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"token"}',
        '2025-07-23 16:25:16.504101+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        'e04fe042-cc90-4841-b972-920cd566cce0',
        '{"action":"token_revoked","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"token"}',
        '2025-07-23 16:25:16.506422+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '36161351-5eaf-4bdc-8b7c-2c18a54bdfd8',
        '{"action":"token_refreshed","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"token"}',
        '2025-07-23 16:25:23.738337+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '74232142-6524-4036-a3a6-5cca87e7e61e',
        '{"action":"token_refreshed","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"token"}',
        '2025-07-23 16:25:23.840325+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        'e5cb04ae-f037-4829-a79e-dfc81c60aba1',
        '{"action":"token_refreshed","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"token"}',
        '2025-07-23 16:25:23.854132+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        'cc051601-8266-49d7-89e9-3123835649dc',
        '{"action":"token_refreshed","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"token"}',
        '2025-07-23 16:25:23.866556+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        'cfaf22e6-817e-40c7-a376-208b25f81ba8',
        '{"action":"token_refreshed","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"token"}',
        '2025-07-23 16:25:23.886471+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        'f339fbd5-8a59-4007-806f-8e79a4415555',
        '{"action":"token_refreshed","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"token"}',
        '2025-07-23 16:25:23.901857+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '7d09d9f3-e05d-49b3-b064-63188e3d697a',
        '{"action":"token_refreshed","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"token"}',
        '2025-07-23 16:25:23.915463+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '43aaf8c2-52f1-4481-9e7b-103ff67604d7',
        '{"action":"token_refreshed","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"token"}',
        '2025-07-23 16:25:23.941461+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '9ea9f791-4ba1-4bf2-9c1f-2d381f7cdd3d',
        '{"action":"token_refreshed","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"token"}',
        '2025-07-23 16:25:24.137013+00',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        'd40513ac-5d27-4fef-9add-7f5c16830543',
        '{"action":"token_refreshed","actor_id":"d61399fe-c47c-4403-8668-ad8dfb1138f7","actor_username":"test@email.com","actor_via_sso":false,"log_type":"token"}',
        '2025-07-23 16:25:24.161107+00',
        ''
    );

--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO
    "auth"."flow_state" (
        "id",
        "user_id",
        "auth_code",
        "code_challenge_method",
        "code_challenge",
        "provider_type",
        "provider_access_token",
        "provider_refresh_token",
        "created_at",
        "updated_at",
        "authentication_method",
        "auth_code_issued_at"
    )
VALUES (
        '434a3d8f-2ff2-447e-814b-d123204524eb',
        '4f4b4d6f-1607-4029-9984-6e3548958747',
        '18829c0d-e11c-42c6-949a-049f2e3a9335',
        's256',
        'GayJfaaH9KLFo3y2P2l7dAdmcRB8wTKhXFmN_teoYVo',
        'email',
        '',
        '',
        '2025-07-04 05:12:22.137455+00',
        '2025-07-04 05:12:22.137455+00',
        'email/signup',
        NULL
    ),
    (
        'a7b8fa49-9fa9-41d1-ad02-4d926bbc9b56',
        'a8ec7224-b02b-4d5f-9c0e-dffc12eea0e5',
        '911aca9b-4221-4eef-b9a5-da3962afe4a2',
        's256',
        '9THyl44tokw9cRyivtvX_jO4x0qb-UHEWLzDXbfZ-Gk',
        'email',
        '',
        '',
        '2025-07-04 06:07:03.603212+00',
        '2025-07-04 06:07:03.603212+00',
        'email/signup',
        NULL
    ),
    (
        'd62b0a44-6dc3-4b8e-ac66-857f8367908b',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        '6716ff8e-af7d-49cd-b4cf-aa91e9f4f2bb',
        's256',
        'iWg10vdYFJ9xnUXDAI6QIRbF5O9CnZ6ogYf3VPLaGXg',
        'email',
        '',
        '',
        '2025-07-04 16:58:23.617281+00',
        '2025-07-04 16:58:23.617281+00',
        'email/signup',
        NULL
    ),
    (
        'dc72e1f5-ab64-4cf9-aa27-95061b8ab7b1',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        'c47ef899-1726-497f-810c-6f55101d3d89',
        's256',
        'uRwyzeMi2UFeq9qbhV-lP8hGBGGTrc8u3bfscLYxZTo',
        'magiclink',
        '',
        '',
        '2025-07-04 20:59:13.96177+00',
        '2025-07-04 20:59:13.96177+00',
        'magiclink',
        NULL
    ),
    (
        '3d875aaf-6f0c-49e0-ae59-2d7287fa2fe9',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        '744cb95e-f25e-406a-a2d7-90cd281b6b21',
        's256',
        'qDqsnhvtwAaGHiG8y9i1gpr9SaYUwpl-KalJ1UdEAGQ',
        'magiclink',
        '',
        '',
        '2025-07-05 16:51:18.959789+00',
        '2025-07-05 16:51:18.959789+00',
        'magiclink',
        NULL
    ),
    (
        'f8d18b2e-bd16-45b4-aa6e-8c8497b7d443',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        'ee59a33e-33dc-4a0f-b61d-ad7636bad9a0',
        's256',
        'buA6UfhTy3x08FaHTcv0NfGmPBDuLDQX_HnCc00Fp18',
        'magiclink',
        '',
        '',
        '2025-07-11 22:02:54.859381+00',
        '2025-07-11 22:02:54.859381+00',
        'magiclink',
        NULL
    ),
    (
        '7e61531f-a264-4bfe-9fb1-8cd4c56dffe9',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        '16c34889-a2bc-454d-b5e6-3b4eefd2ef01',
        's256',
        'aQTTwErif1nMR84r-40WqBM4rgRXyI7h4POJndlMXqc',
        'magiclink',
        '',
        '',
        '2025-07-18 14:25:58.123473+00',
        '2025-07-18 14:25:58.123473+00',
        'magiclink',
        NULL
    ),
    (
        '87700da3-6e3b-4d22-9d45-83df58d950b5',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        '3299b8ba-cea3-47e7-8942-c3dfc8596871',
        's256',
        'UyZL5a2sc21nJDvbmrF0kjSpOA0FExz-ZT3dZ60aB_g',
        'magiclink',
        '',
        '',
        '2025-07-18 18:22:19.596373+00',
        '2025-07-18 18:22:19.596373+00',
        'magiclink',
        NULL
    );

--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO
    "auth"."users" (
        "instance_id",
        "id",
        "aud",
        "role",
        "email",
        "encrypted_password",
        "email_confirmed_at",
        "invited_at",
        "confirmation_token",
        "confirmation_sent_at",
        "recovery_token",
        "recovery_sent_at",
        "email_change_token_new",
        "email_change",
        "email_change_sent_at",
        "last_sign_in_at",
        "raw_app_meta_data",
        "raw_user_meta_data",
        "is_super_admin",
        "created_at",
        "updated_at",
        "phone",
        "phone_confirmed_at",
        "phone_change",
        "phone_change_token",
        "phone_change_sent_at",
        "email_change_token_current",
        "email_change_confirm_status",
        "banned_until",
        "reauthentication_token",
        "reauthentication_sent_at",
        "is_sso_user",
        "deleted_at",
        "is_anonymous"
    )
VALUES (
        '00000000-0000-0000-0000-000000000000',
        'aec53558-767e-4408-b4d6-1c1e6f17ffe5',
        'authenticated',
        'authenticated',
        'user@example.com',
        '$2a$10$nnqTShcTX48N6QWWjbPUee.wrGz1kGx/uq5lORviCm.fn04W1BeRe',
        '2024-09-01 17:21:01.462788+00',
        NULL,
        '',
        NULL,
        '',
        NULL,
        '',
        '',
        NULL,
        NULL,
        '{"provider": "email", "providers": ["email"]}',
        '{"username": "username", "full_name": "Test User"}',
        NULL,
        '2024-09-01 17:21:01.455486+00',
        '2024-09-01 17:21:01.46295+00',
        NULL,
        NULL,
        '',
        '',
        NULL,
        '',
        0,
        NULL,
        '',
        NULL,
        false,
        NULL,
        false
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        'a8ec7224-b02b-4d5f-9c0e-dffc12eea0e5',
        'authenticated',
        'authenticated',
        'admin@email.com',
        '$2a$10$2dx/lOoqJvUQoiGt8lK/7OSW7UZ6nzFrRyxsvgWycOD9CZr27SBvy',
        '2025-07-04 06:07:10.672853+00',
        NULL,
        '',
        '2025-07-04 06:07:03.603843+00',
        '',
        NULL,
        '',
        '',
        NULL,
        '2025-07-04 06:07:10.675221+00',
        '{"provider": "email", "providers": ["email"]}',
        '{"sub": "a8ec7224-b02b-4d5f-9c0e-dffc12eea0e5", "email": "admin@email.com", "email_verified": true, "phone_verified": false}',
        NULL,
        '2025-07-04 06:07:03.597711+00',
        '2025-07-04 06:07:10.677244+00',
        NULL,
        NULL,
        '',
        '',
        NULL,
        '',
        0,
        NULL,
        '',
        NULL,
        false,
        NULL,
        false
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '4f4b4d6f-1607-4029-9984-6e3548958747',
        'authenticated',
        'authenticated',
        'loops@test.com',
        '$2a$10$/Exir3lX.5Tid/xsGDIoBesfH5EFz0P39heWH1fxvl/cTBn1OeFvm',
        '2025-07-04 05:12:43.452402+00',
        NULL,
        '',
        '2025-07-04 05:12:22.138372+00',
        '',
        NULL,
        '',
        '',
        NULL,
        '2025-07-04 05:12:43.455843+00',
        '{"provider": "email", "providers": ["email"]}',
        '{"sub": "4f4b4d6f-1607-4029-9984-6e3548958747", "role": "investor", "email": "loops@test.com", "full_name": "Loop Test", "phone_number": "+14849478414", "email_verified": true, "phone_verified": false}',
        NULL,
        '2025-07-04 05:12:22.129078+00',
        '2025-07-04 05:12:43.45893+00',
        NULL,
        NULL,
        '',
        '',
        NULL,
        '',
        0,
        NULL,
        '',
        NULL,
        false,
        NULL,
        false
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        'authenticated',
        'authenticated',
        'test@email.com',
        '$2a$10$fUJLGzFSpA0fjjKugN5qiuDc6qhwaShKqrt785YoChtWS6ug2hrHa',
        '2025-07-04 16:58:36.38456+00',
        NULL,
        '',
        '2025-07-04 16:58:23.619158+00',
        '',
        '2025-07-18 18:22:19.602095+00',
        '',
        '',
        NULL,
        '2025-07-18 18:22:41.550595+00',
        '{"provider": "email", "providers": ["email"]}',
        '{"sub": "d61399fe-c47c-4403-8668-ad8dfb1138f7", "email": "test@email.com", "email_verified": true, "phone_verified": false}',
        NULL,
        '2025-07-04 16:58:23.600465+00',
        '2025-07-23 16:25:16.509105+00',
        NULL,
        NULL,
        '',
        '',
        NULL,
        '',
        0,
        NULL,
        '',
        NULL,
        false,
        NULL,
        false
    );

--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO
    "auth"."identities" (
        "provider_id",
        "user_id",
        "identity_data",
        "provider",
        "last_sign_in_at",
        "created_at",
        "updated_at",
        "id"
    )
VALUES (
        'aec53558-767e-4408-b4d6-1c1e6f17ffe5',
        'aec53558-767e-4408-b4d6-1c1e6f17ffe5',
        '{"sub": "aec53558-767e-4408-b4d6-1c1e6f17ffe5", "email": "user@example.com", "email_verified": false, "phone_verified": false}',
        'email',
        '2024-09-01 17:21:01.459821+00',
        '2024-09-01 17:21:01.459849+00',
        '2024-09-01 17:21:01.459849+00',
        'c5e81668-437b-47c2-83e2-84b8566b3018'
    ),
    (
        '4f4b4d6f-1607-4029-9984-6e3548958747',
        '4f4b4d6f-1607-4029-9984-6e3548958747',
        '{"sub": "4f4b4d6f-1607-4029-9984-6e3548958747", "role": "investor", "email": "loops@test.com", "full_name": "Loop Test", "phone_number": "+14849478414", "email_verified": true, "phone_verified": false}',
        'email',
        '2025-07-04 05:12:22.134753+00',
        '2025-07-04 05:12:22.134778+00',
        '2025-07-04 05:12:22.134778+00',
        '4097f6cb-418a-4370-af13-56104b88975a'
    ),
    (
        'a8ec7224-b02b-4d5f-9c0e-dffc12eea0e5',
        'a8ec7224-b02b-4d5f-9c0e-dffc12eea0e5',
        '{"sub": "a8ec7224-b02b-4d5f-9c0e-dffc12eea0e5", "email": "admin@email.com", "email_verified": true, "phone_verified": false}',
        'email',
        '2025-07-04 06:07:03.601049+00',
        '2025-07-04 06:07:03.601072+00',
        '2025-07-04 06:07:03.601072+00',
        '52e48e38-7f43-4588-a7b6-9c842e33dd3b'
    ),
    (
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        '{"sub": "d61399fe-c47c-4403-8668-ad8dfb1138f7", "email": "test@email.com", "email_verified": true, "phone_verified": false}',
        'email',
        '2025-07-04 16:58:23.613044+00',
        '2025-07-04 16:58:23.613075+00',
        '2025-07-04 16:58:23.613075+00',
        '837597a4-d98c-4ccf-a367-a19bfb9f248f'
    );

--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO
    "auth"."sessions" (
        "id",
        "user_id",
        "created_at",
        "updated_at",
        "factor_id",
        "aal",
        "not_after",
        "refreshed_at",
        "user_agent",
        "ip",
        "tag"
    )
VALUES (
        '9ba39474-54eb-4796-a483-4cf38e25a56e',
        '4f4b4d6f-1607-4029-9984-6e3548958747',
        '2025-07-04 05:12:43.455918+00',
        '2025-07-04 05:12:43.455918+00',
        NULL,
        'aal1',
        NULL,
        NULL,
        'node',
        '172.19.0.1',
        NULL
    ),
    (
        '8e313f84-234c-4814-922c-7fa81d2e190c',
        'a8ec7224-b02b-4d5f-9c0e-dffc12eea0e5',
        '2025-07-04 06:07:10.675284+00',
        '2025-07-04 06:07:10.675284+00',
        NULL,
        'aal1',
        NULL,
        NULL,
        'node',
        '172.19.0.1',
        NULL
    ),
    (
        '6701575f-bb4c-4fea-b178-6332a1038cf4',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        '2025-07-04 16:58:36.387847+00',
        '2025-07-04 16:58:36.387847+00',
        NULL,
        'aal1',
        NULL,
        NULL,
        'node',
        '172.19.0.1',
        NULL
    ),
    (
        '969f75f9-778f-4082-bafe-4ce6f7a39a1e',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        '2025-07-05 16:51:28.046703+00',
        '2025-07-05 16:51:28.046703+00',
        NULL,
        'aal1',
        NULL,
        NULL,
        'node',
        '172.19.0.1',
        NULL
    ),
    (
        '97c2fe39-3660-480d-9298-2865598eace5',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        '2025-07-11 22:03:44.666251+00',
        '2025-07-14 15:05:57.122241+00',
        NULL,
        'aal1',
        NULL,
        '2025-07-14 15:05:57.122202',
        'Next.js Middleware',
        '172.19.0.1',
        NULL
    ),
    (
        '31b40509-305e-47ad-b1c4-5c6bc6b1b15c',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        '2025-07-18 14:26:09.539804+00',
        '2025-07-18 14:26:09.539804+00',
        NULL,
        'aal1',
        NULL,
        NULL,
        'node',
        '172.19.0.1',
        NULL
    ),
    (
        '3885a7fd-2242-4bd8-9c7b-0f15ac5e66ce',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        '2025-07-18 18:22:41.550724+00',
        '2025-07-23 16:25:24.163123+00',
        NULL,
        'aal1',
        NULL,
        '2025-07-23 16:25:24.163065',
        'node',
        '172.19.0.1',
        NULL
    );

--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO
    "auth"."mfa_amr_claims" (
        "session_id",
        "created_at",
        "updated_at",
        "authentication_method",
        "id"
    )
VALUES (
        '9ba39474-54eb-4796-a483-4cf38e25a56e',
        '2025-07-04 05:12:43.459492+00',
        '2025-07-04 05:12:43.459492+00',
        'otp',
        'bc23d741-f642-40d1-a676-e11d19cee0fd'
    ),
    (
        '8e313f84-234c-4814-922c-7fa81d2e190c',
        '2025-07-04 06:07:10.677651+00',
        '2025-07-04 06:07:10.677651+00',
        'otp',
        '556f16f6-b7e8-4865-a3ef-dd17050652dc'
    ),
    (
        '6701575f-bb4c-4fea-b178-6332a1038cf4',
        '2025-07-04 16:58:36.393619+00',
        '2025-07-04 16:58:36.393619+00',
        'otp',
        'e14c47bd-7fbd-482b-a694-f2317571113e'
    ),
    (
        '969f75f9-778f-4082-bafe-4ce6f7a39a1e',
        '2025-07-05 16:51:28.054249+00',
        '2025-07-05 16:51:28.054249+00',
        'otp',
        'f9c01018-3728-4c97-91f2-fd99b53b789a'
    ),
    (
        '97c2fe39-3660-480d-9298-2865598eace5',
        '2025-07-11 22:03:44.679414+00',
        '2025-07-11 22:03:44.679414+00',
        'otp',
        '2f148a40-6c96-4d8f-a712-e3b2e51bbbd8'
    ),
    (
        '31b40509-305e-47ad-b1c4-5c6bc6b1b15c',
        '2025-07-18 14:26:09.54442+00',
        '2025-07-18 14:26:09.54442+00',
        'otp',
        '0a7f4270-a17f-44c8-81f5-0d1ddfbbdfcc'
    ),
    (
        '3885a7fd-2242-4bd8-9c7b-0f15ac5e66ce',
        '2025-07-18 18:22:41.553949+00',
        '2025-07-18 18:22:41.553949+00',
        'otp',
        'dc93f0d2-9503-43de-9512-d7baafbad661'
    );

--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO
    "auth"."refresh_tokens" (
        "instance_id",
        "id",
        "token",
        "user_id",
        "revoked",
        "created_at",
        "updated_at",
        "parent",
        "session_id"
    )
VALUES (
        '00000000-0000-0000-0000-000000000000',
        1,
        'isdvnar6mqgm',
        '4f4b4d6f-1607-4029-9984-6e3548958747',
        false,
        '2025-07-04 05:12:43.457287+00',
        '2025-07-04 05:12:43.457287+00',
        NULL,
        '9ba39474-54eb-4796-a483-4cf38e25a56e'
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        2,
        'q5etl4iw67cd',
        'a8ec7224-b02b-4d5f-9c0e-dffc12eea0e5',
        false,
        '2025-07-04 06:07:10.676051+00',
        '2025-07-04 06:07:10.676051+00',
        NULL,
        '8e313f84-234c-4814-922c-7fa81d2e190c'
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        3,
        's6p5u6osz4t4',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        false,
        '2025-07-04 16:58:36.389917+00',
        '2025-07-04 16:58:36.389917+00',
        NULL,
        '6701575f-bb4c-4fea-b178-6332a1038cf4'
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        5,
        'vgh3h3koshso',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        false,
        '2025-07-05 16:51:28.049643+00',
        '2025-07-05 16:51:28.049643+00',
        NULL,
        '969f75f9-778f-4082-bafe-4ce6f7a39a1e'
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        6,
        'apwnp3vbapf2',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        true,
        '2025-07-11 22:03:44.67093+00',
        '2025-07-14 15:05:57.118976+00',
        NULL,
        '97c2fe39-3660-480d-9298-2865598eace5'
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        7,
        'dlfqji4qedtn',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        false,
        '2025-07-14 15:05:57.119624+00',
        '2025-07-14 15:05:57.119624+00',
        'apwnp3vbapf2',
        '97c2fe39-3660-480d-9298-2865598eace5'
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        8,
        '2tqpjtrqm42u',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        false,
        '2025-07-18 14:26:09.542355+00',
        '2025-07-18 14:26:09.542355+00',
        NULL,
        '31b40509-305e-47ad-b1c4-5c6bc6b1b15c'
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        9,
        '7cqteyvygjyg',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        true,
        '2025-07-18 18:22:41.551936+00',
        '2025-07-23 01:59:03.625055+00',
        NULL,
        '3885a7fd-2242-4bd8-9c7b-0f15ac5e66ce'
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        10,
        'ivcp6pmdblmu',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        true,
        '2025-07-23 01:59:03.625706+00',
        '2025-07-23 16:25:16.506896+00',
        '7cqteyvygjyg',
        '3885a7fd-2242-4bd8-9c7b-0f15ac5e66ce'
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        11,
        'b5merq2cv6yw',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        false,
        '2025-07-23 16:25:16.507774+00',
        '2025-07-23 16:25:16.507774+00',
        'ivcp6pmdblmu',
        '3885a7fd-2242-4bd8-9c7b-0f15ac5e66ce'
    );

--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

--
-- Data for Name: asset_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO
    "public"."asset_types" (
        "id",
        "name",
        "description",
        "use_codes",
        "slug",
        "created_at",
        "updated_at"
    )
VALUES (
        '7e673dc4-f526-46b6-854e-ee974c8ec0e1',
        'Lodging',
        'Hotels, motels, bed & breakfasts, and other transient lodging facilities',
        '{131,153,154,155,163,299}',
        'lodging',
        '2025-07-04 05:12:07.180142+00',
        '2025-07-04 05:12:07.180142+00'
    ),
    (
        '7c54e63f-53d5-42a9-8c46-a6c50939e5ea',
        'Parking & Transit',
        'Parking facilities, transportation hubs, and transit-related properties',
        '{172,174,258,265,291,300,349,418}',
        'parking-transit',
        '2025-07-04 05:12:07.180142+00',
        '2025-07-04 05:12:07.180142+00'
    ),
    (
        '4ee89bde-dd3c-412b-af44-bfa8e7be9629',
        'Other',
        'Auto repair, medical, professional services, and other commercial service properties',
        '{126,142,145,147,156,157,173,175,177,180,185,186,190,191,192,193,204,296,311,312,412,458,464}',
        'other',
        '2025-07-04 05:12:07.180142+00',
        '2025-07-04 05:12:07.180142+00'
    ),
    (
        'a07c5089-0272-4e9c-8053-207885446228',
        'Residential',
        'Single-family homes, condos, townhouses, and multi-family properties up to 4 units',
        '{365,366,367,369,372,373,376,377,380,382,383,384,385,386,387,388,390}',
        'residential',
        '2025-07-04 05:12:07.200574+00',
        '2025-07-04 05:12:07.200574+00'
    ),
    (
        '4dc444e2-aeba-47b7-9e86-01622dc6d4fa',
        'Multi-Family',
        'Apartment buildings with 5+ units',
        '{357,358,359,360,361,381}',
        'multi-family',
        '2025-07-04 05:12:07.200574+00',
        '2025-07-04 05:12:07.200574+00'
    ),
    (
        'ac355a08-fbe6-4036-a938-8ec8923cae30',
        'Office',
        'Commercial office buildings and spaces',
        '{136,139,140,169,170,176,177,184}',
        'office',
        '2025-07-04 05:12:07.200574+00',
        '2025-07-04 05:12:07.200574+00'
    ),
    (
        'e6309990-655c-4263-8b02-11a49908bf74',
        'Industrial',
        'Warehouses, manufacturing facilities, and distribution centers',
        '{195,196,197,198,199,200,201,202,203,205,206,207,208,210,211,212,213,215,216,217,218,220,221,224,225,226,227,228,231,232,238}',
        'industrial',
        '2025-07-04 05:12:07.200574+00',
        '2025-07-04 05:12:07.200574+00'
    ),
    (
        '25bed996-3023-42af-8315-ddf203dbfe7c',
        'Land',
        'Vacant land and development sites',
        '{102,112,117,389,392,393,394,395,396,398,399,400,401,403,404,406}',
        'land',
        '2025-07-04 05:12:07.200574+00',
        '2025-07-04 05:12:07.200574+00'
    ),
    (
        '22786fc4-c0c5-454f-b1e4-cd33cb05a3a9',
        'Hospitality',
        'Hotels, motels, and resorts',
        '{131,132,153,154,155,163,273}',
        'hospitality',
        '2025-07-04 05:12:07.200574+00',
        '2025-07-04 05:12:07.200574+00'
    ),
    (
        '75ffd021-00ab-48f8-b3d1-9b909d970b2f',
        'Self Storage',
        'Self-storage facilities and storage unit complexes',
        '{229,196,236,202,235,238,448,356}',
        'self-storage',
        '2025-07-04 05:12:07.200574+00',
        '2025-07-04 05:12:07.200574+00'
    ),
    (
        '42c7b40f-7db4-4b49-9332-809d130cbd07',
        'Mixed-Use',
        'Properties with multiple uses (e.g., retail on ground floor, residential above)',
        '{140,161,171,187}',
        'mixed-use',
        '2025-07-04 05:12:07.200574+00',
        '2025-07-04 05:12:07.200574+00'
    ),
    (
        '7739c345-422b-4b37-89f6-eda01aec0054',
        'Mobile Homes',
        'Manufactured, modular, pre-fabricated, and mobile homes',
        '{371,373}',
        'mobile-homes',
        '2025-07-04 05:12:07.200574+00',
        '2025-07-04 05:12:07.200574+00'
    ),
    (
        '294a051e-db56-4ea9-bdc6-20064e473d9f',
        'Retail',
        'Retail stores, shopping centers, and malls',
        '{124,125,128,129,130,141,143,144,145,146,148,151,158,166,167,178,179,183,188,189,2013}',
        'retail',
        '2025-07-04 05:12:07.200574+00',
        '2025-07-04 17:04:01.916306+00'
    );

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO
    "public"."users" (
        "id",
        "email",
        "full_name",
        "phone_number",
        "avatar_url",
        "locale",
        "timezone",
        "time_format",
        "created_at",
        "updated_at",
        "role",
        "billing_address",
        "crm_id"
    )
VALUES (
        '4f4b4d6f-1607-4029-9984-6e3548958747',
        'loops@test.com',
        'Loop Test',
        '+14849478414',
        NULL,
        'en',
        NULL,
        24,
        '2025-07-04 05:12:22.128751+00',
        '2025-07-04 05:12:44.054679+00',
        'investor',
        NULL,
        'cmcocyrqi01y8z00jv1hbogbe'
    ),
    (
        'a8ec7224-b02b-4d5f-9c0e-dffc12eea0e5',
        'admin@email.com',
        NULL,
        NULL,
        NULL,
        'en',
        NULL,
        24,
        '2025-07-04 06:07:03.597406+00',
        '2025-07-04 06:07:11.22001+00',
        'investor',
        NULL,
        'cmcoewso30mts0g0i4q54f7lg'
    ),
    (
        'aec53558-767e-4408-b4d6-1c1e6f17ffe5',
        'user@example.com',
        'Test User',
        '+1234567890',
        NULL,
        'en',
        NULL,
        24,
        '2025-07-04 05:12:07.200574+00',
        '2025-07-04 06:11:27.054302+00',
        'investor',
        NULL,
        NULL
    ),
    (
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        'test@email.com',
        NULL,
        NULL,
        NULL,
        'en',
        NULL,
        24,
        '2025-07-04 16:58:23.599797+00',
        '2025-07-04 16:58:37.519247+00',
        'investor',
        NULL,
        'cmc4587si05hkyo0itpfpiofa'
    );

--
-- Data for Name: asset_licenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO
    "public"."asset_licenses" (
        "id",
        "user_id",
        "asset_type_slug",
        "search_params",
        "is_active",
        "created_at",
        "updated_at",
        "use_codes"
    )
VALUES (
        'bd010a3e-9be9-43ee-86b8-d1711b88d725',
        'aec53558-767e-4408-b4d6-1c1e6f17ffe5',
        'residential',
        '{"year_min": 2010, "use_codes": [365, 366, 367, 369, 372, 373, 376, 377, 380, 382, 383, 384, 385, 386, 387, 388, 390], "building_size_min": 2010}',
        true,
        '2024-09-01 17:21:01.455486+00',
        '2024-09-01 17:21:01.46295+00',
        NULL
    ),
    (
        'bc44ce2f-cbee-4b38-a2b0-9ea3cb1a92ca',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        'multi-family',
        '{}',
        true,
        '2025-07-05 16:55:31.928844+00',
        '2025-07-05 16:55:31.928844+00',
        NULL
    );

--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO
    "public"."customers" ("id", "stripe_customer_id")
VALUES (
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        'cus_SN7qfrx0NcpNJN'
    );

--
-- Data for Name: location_licenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO
    "public"."location_licenses" (
        "id",
        "asset_license_id",
        "location_internal_id",
        "location_name",
        "location_type",
        "location_formatted",
        "location_state",
        "result_count",
        "expires_at",
        "is_active",
        "created_at",
        "updated_at"
    )
VALUES (
        'c97acf9f-8a30-4ac1-9196-a0ee144e1298',
        'bd010a3e-9be9-43ee-86b8-d1711b88d725',
        'c-fl-vero-beach',
        'Vero Beach',
        'city',
        'Vero Beach, FL',
        'FL',
        150,
        '2025-12-31 23:59:59+00',
        true,
        '2024-09-01 17:21:01.455486+00',
        '2024-09-01 17:21:01.46295+00'
    ),
    (
        '7ad4e120-00d5-4597-9838-2619b191f128',
        'bc44ce2f-cbee-4b38-a2b0-9ea3cb1a92ca',
        'c-fl-vero-beach',
        'Vero Beach',
        'city',
        'Vero Beach, FL',
        'FL',
        52,
        '2025-08-05 16:55:25+00',
        true,
        '2025-07-05 16:55:31.938841+00',
        '2025-07-05 16:55:31.938841+00'
    );

--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO
    "public"."products" (
        "id",
        "active",
        "name",
        "description",
        "image",
        "metadata"
    )
VALUES (
        'prod_Scp0YeDdhgA0HR',
        true,
        'Multi-Family - Vero Beach, FL',
        NULL,
        NULL,
        '{}'
    ),
    (
        'prod_Scp0r5j08a7KdA',
        true,
        'Licensing Fee',
        NULL,
        NULL,
        '{}'
    );

--
-- Data for Name: prices; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO
    "public"."prices" (
        "id",
        "product_id",
        "active",
        "description",
        "unit_amount",
        "currency",
        "type",
        "interval",
        "interval_count",
        "trial_period_days",
        "metadata"
    )
VALUES (
        'price_1RhZMkFrXwG87GjCiBFgW8H7',
        'prod_Scp0YeDdhgA0HR',
        true,
        NULL,
        2600,
        'usd',
        'recurring',
        'month',
        1,
        0,
        NULL
    ),
    (
        'price_1RhZMkFrXwG87GjCUPgr8Rml',
        'prod_Scp0r5j08a7KdA',
        true,
        NULL,
        2600,
        'usd',
        'one_time',
        NULL,
        NULL,
        0,
        NULL
    );

--
-- Data for Name: property_records; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO
    "public"."property_records" (
        "id",
        "location_license_id",
        "asset_license_id",
        "user_id",
        "property_id",
        "address",
        "city",
        "state",
        "zip",
        "county",
        "street",
        "fips",
        "mail_address",
        "mail_city",
        "mail_state",
        "mail_zip",
        "mail_street",
        "owner1_first_name",
        "owner1_last_name",
        "owner2_first_name",
        "owner2_last_name",
        "corporate_owned",
        "owner_occupied",
        "absentee_owner",
        "out_of_state_absentee_owner",
        "property_use",
        "property_use_code",
        "property_type",
        "land_use",
        "lot_square_feet",
        "square_feet",
        "year_built",
        "bedrooms",
        "bathrooms",
        "stories",
        "rooms_count",
        "units_count",
        "last_sale_date",
        "last_sale_amount",
        "last_sale_arms_length",
        "prior_sale_amount",
        "assessed_value",
        "estimated_value",
        "price_per_square_foot",
        "lender_name",
        "last_mortgage1_amount",
        "loan_type_code",
        "adjustable_rate",
        "recording_date",
        "maturity_date_first",
        "open_mortgage_balance",
        "private_lender",
        "high_equity",
        "negative_equity",
        "equity_percent",
        "vacant",
        "patio",
        "patio_area",
        "pool",
        "pool_area",
        "pre_foreclosure",
        "reo",
        "judgment",
        "tax_lien",
        "tax_delinquent_year",
        "mls_active",
        "mls_cancelled",
        "mls_failed",
        "mls_has_photos",
        "mls_listing_price",
        "mls_pending",
        "mls_sold",
        "mls_days_on_market",
        "mls_last_sale_date",
        "mls_last_status_date",
        "mls_listing_date",
        "mls_sold_price",
        "mls_status",
        "mls_type",
        "total_properties_owned",
        "total_portfolio_value",
        "total_portfolio_equity",
        "total_portfolio_mortgage_balance",
        "portfolio_purchased_last_6_months",
        "portfolio_purchased_last_12_months",
        "years_owned",
        "latitude",
        "longitude",
        "listing_amount",
        "rent_amount",
        "suggested_rent",
        "median_income",
        "last_update_date",
        "document_type",
        "document_type_code",
        "parcel_account_number",
        "prior_owner_individual",
        "prior_owner_months_owned",
        "mfh_2_to_4",
        "mfh_5_plus",
        "neighborhood",
        "created_at",
        "updated_at",
        "skip_trace_data",
        "skip_trace_updated_at"
    )
VALUES (
        'c6c11523-cc90-4f7e-8d21-4363168a4148',
        '7ad4e120-00d5-4597-9838-2619b191f128',
        'bc44ce2f-cbee-4b38-a2b0-9ea3cb1a92ca',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        '30770164',
        '1845 42nd Ave # 10, Vero Beach, FL 32960',
        'Vero Beach',
        'FL',
        '32960',
        'Indian River County',
        '1845 42nd Ave # 10',
        '12061',
        'Po Box 534, Vero Beach, FL 32961',
        'Vero Beach',
        'FL',
        '32961',
        'Po Box 534',
        NULL,
        'Lb Properties Vero Llc',
        NULL,
        NULL,
        true,
        false,
        true,
        false,
        'Garden Apt, Court Apt (5+ Units)',
        357,
        'MFR',
        'Commercial',
        45302,
        12300,
        2023,
        NULL,
        NULL,
        NULL,
        NULL,
        10,
        NULL,
        '0',
        NULL,
        '115000',
        1025868,
        1025868,
        NULL,
        'Marine Bank & Trust Company',
        NULL,
        '4',
        false,
        '2021-05-11',
        NULL,
        1000000,
        false,
        false,
        false,
        8,
        false,
        false,
        NULL,
        false,
        NULL,
        false,
        false,
        false,
        NULL,
        NULL,
        false,
        false,
        false,
        false,
        NULL,
        false,
        false,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        4,
        27.63616535161202,
        -80.42937286352903,
        NULL,
        NULL,
        NULL,
        '45111',
        '2025-01-27',
        'Warranty Deed',
        'DTWD',
        NULL,
        true,
        '5',
        false,
        true,
        NULL,
        '2025-07-05 16:55:34.132729+00',
        '2025-07-05 17:00:26.679982+00',
        '{"live": true, "input": {"zip": "32960", "city": "Vero Beach", "state": "FL", "address": "1845 42nd Ave # 10, Vero Beach, FL 32960", "last_name": "Lb Properties Vero Llc"}, "match": false, "cached": false, "output": null, "requestId": "be4915ae-c578-4044-a35e-dd11b1d09e40", "statusCode": 404, "requestDate": "2025-07-05T16:55:36.716Z", "statusMessage": "Not Found", "responseMessage": "No phones found for provided person.", "requestExecutionTimeMS": "92ms"}',
        '2025-07-05 16:55:36.632+00'
    ),
    (
        '42eb05e1-2ad0-4a8f-936a-f2321c476ea9',
        '7ad4e120-00d5-4597-9838-2619b191f128',
        'bc44ce2f-cbee-4b38-a2b0-9ea3cb1a92ca',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        '39962215',
        '1055 Royal Palm Blvd, Vero Beach, FL 32960',
        'Vero Beach',
        'FL',
        '32960',
        'Indian River County',
        '1055 Royal Palm Blvd',
        '12061',
        '2200 Sanderling Ln, Vero Beach, FL 32963',
        'Vero Beach',
        'FL',
        '32963',
        '2200 Sanderling Ln',
        NULL,
        'Jacourt Properties Llc',
        'James',
        'Court',
        true,
        false,
        true,
        false,
        'Garden Apt, Court Apt (5+ Units)',
        357,
        'MFR',
        'Residential',
        64469,
        9982,
        2023,
        NULL,
        NULL,
        NULL,
        NULL,
        20,
        NULL,
        '0',
        NULL,
        '800000',
        1230169,
        1230169,
        NULL,
        'David Bennett',
        NULL,
        'SEL',
        false,
        '2023-08-15',
        '2011-10-09',
        600000,
        false,
        true,
        false,
        71,
        false,
        false,
        NULL,
        false,
        NULL,
        false,
        false,
        false,
        NULL,
        NULL,
        false,
        false,
        false,
        false,
        NULL,
        false,
        false,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        '3',
        '2193169',
        '1837000',
        '356169',
        NULL,
        NULL,
        1,
        27.64167350945842,
        -80.39508629935231,
        NULL,
        NULL,
        NULL,
        '45111',
        '2025-02-26',
        'Quit Claim Deed',
        'DTQC',
        NULL,
        NULL,
        '202',
        false,
        true,
        '{"id": "214205", "name": "Royal Park", "type": "subdivision", "center": "POINT(-80.388852952393 27.645245682265)"}',
        '2025-07-05 16:55:34.132729+00',
        '2025-07-05 17:00:26.679982+00',
        NULL,
        NULL
    ),
    (
        '6d0c378c-c44b-4f68-8e17-c0875ee4b024',
        '7ad4e120-00d5-4597-9838-2619b191f128',
        'bc44ce2f-cbee-4b38-a2b0-9ea3cb1a92ca',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        '163126116',
        '4255 32nd Ave, Vero Beach, FL 32967',
        'Vero Beach',
        'FL',
        '32967',
        'Indian River County',
        '4255 32nd Ave',
        '12061',
        '2525 Saint Lucie Ave, Vero Beach, FL 32960',
        'Vero Beach',
        'FL',
        '32960',
        '2525 Saint Lucie Ave',
        NULL,
        'Coalition For Attainable Homes Inc',
        NULL,
        NULL,
        true,
        false,
        true,
        false,
        'Apartments (Generic)',
        360,
        'MFR',
        'Residential',
        13504,
        3006,
        2023,
        NULL,
        NULL,
        NULL,
        NULL,
        3,
        NULL,
        '0',
        NULL,
        '0',
        402415,
        586000,
        NULL,
        NULL,
        NULL,
        NULL,
        false,
        '2020-04-16',
        NULL,
        NULL,
        false,
        true,
        false,
        100,
        false,
        false,
        NULL,
        false,
        NULL,
        false,
        false,
        false,
        NULL,
        NULL,
        false,
        false,
        false,
        false,
        NULL,
        false,
        false,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        '33',
        '12570591',
        '12570591',
        '0',
        NULL,
        NULL,
        5,
        27.67012509347008,
        -80.41840543323814,
        NULL,
        NULL,
        NULL,
        '63047',
        '2025-06-11',
        'Quit Claim Deed',
        'DTQC',
        NULL,
        NULL,
        NULL,
        true,
        false,
        NULL,
        '2025-07-05 16:55:34.132729+00',
        '2025-07-05 17:00:26.679982+00',
        '{"live": true, "input": {"zip": "32967", "city": "Vero Beach", "state": "FL", "address": "4255 32nd Ave, Vero Beach, FL 32967", "last_name": "Coalition For Attainable Homes Inc"}, "match": true, "cached": false, "output": {"stats": {"jobs": 1, "names": 1, "images": 0, "addresses": 2, "associates": 0, "phoneNumbers": 1, "searchResults": 1, "emailAddresses": 1, "socialProfiles": 0}, "identity": {"names": [{"fullName": "Fiona Zimmerman", "lastName": "Zimmerman", "firstName": "Fiona", "middleName": ""}], "emails": [{"email": "flzimmerman@gmail.com", "emailType": "personal"}], "phones": [{"phone": "7722342935", "lastSeen": "2025-04-14", "doNotCall": true, "phoneType": "landline", "telcoName": "", "validSince": "", "isConnected": false, "phoneDisplay": "(772) 234-2935", "phoneExtension": ""}], "address": {"z4": "5070", "zip": "32960", "city": "Vero Beach", "house": "2845", "state": "FL", "aptNbr": "", "county": "", "preDir": "", "street": "Country Club", "aptType": "", "postDir": "", "strType": "Dr", "lastSeen": "2025-04-14", "latitude": "", "longitude": "", "validSince": "", "formattedAddress": "2845 Country Club Dr, Vero Beach, FL 32960"}, "addressHistory": [{"z4": "3385", "zip": "32960", "city": "Vero Beach", "house": "2525", "state": "FL", "aptNbr": "", "county": "", "preDir": "", "street": "Saint Lucie", "aptType": "", "postDir": "", "strType": "Ave", "lastSeen": "2025-04-14", "latitude": "", "longitude": "", "validSince": "", "formattedAddress": "2525 Saint Lucie Ave, Vero Beach, FL 32960"}]}, "demographics": {"age": 22, "dob": "2002 - 2003", "dod": "", "jobs": [{"org": "", "dates": "", "title": "Unknown", "display": "Unknown", "industry": ""}], "names": [{"type": "", "prefix": "", "suffix": "", "fullName": "Fiona Zimmerman", "lastName": "Zimmerman", "lastSeen": "", "firstName": "Fiona", "middleName": "", "validSince": ""}], "gender": "Female", "images": [], "social": [], "deceased": false, "education": [], "ageDisplay": "22 years old"}, "relationships": []}, "credits": 10, "warnings": "None", "requestId": "641eb2d2-a3d7-4143-8114-4da90d461eb1", "statusCode": 200, "requestDate": "2025-07-05T16:55:37.871Z", "responseCode": 0, "statusMessage": "Success", "responseMessage": "Successful", "requestExecutionTimeMS": "435ms"}',
        '2025-07-05 16:55:37.788+00'
    ),
    (
        '68f09584-2b24-4bcb-8d0d-54f4a23113ef',
        '7ad4e120-00d5-4597-9838-2619b191f128',
        'bc44ce2f-cbee-4b38-a2b0-9ea3cb1a92ca',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        '700037206088',
        'Vero Beach, FL 32966',
        'Vero Beach',
        'FL',
        '32966',
        'Indian River County',
        NULL,
        '12061',
        '433 Las Colinas Blvd E Ste 300, Irving, TX 75039',
        'Irving',
        'TX',
        '75039',
        '433 Las Colinas Blvd E Ste 300',
        NULL,
        'Wp Verobch Mf-Fl Owner Llc',
        NULL,
        NULL,
        true,
        false,
        false,
        false,
        'Garden Apt, Court Apt (5+ Units)',
        357,
        'MFR',
        'Multiple Garden Residence',
        957884,
        31605,
        2023,
        NULL,
        NULL,
        NULL,
        NULL,
        36,
        NULL,
        '0',
        true,
        '12475000',
        4182279,
        4182279,
        NULL,
        NULL,
        NULL,
        NULL,
        false,
        '2009-07-28',
        NULL,
        NULL,
        false,
        true,
        false,
        100,
        false,
        false,
        NULL,
        false,
        NULL,
        false,
        false,
        false,
        NULL,
        NULL,
        false,
        false,
        false,
        false,
        NULL,
        false,
        false,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        15,
        27.640768220352765,
        -80.48372447455958,
        NULL,
        NULL,
        NULL,
        '57851',
        '2025-06-02',
        'Trustees Deed',
        'DTTD',
        NULL,
        NULL,
        '34',
        false,
        true,
        NULL,
        '2025-07-05 16:55:34.132729+00',
        '2025-07-05 17:00:26.679982+00',
        '{"live": true, "input": {"zip": "32966", "city": "Vero Beach", "state": "FL", "address": "Vero Beach, FL 32966", "last_name": "Wp Verobch Mf-Fl Owner Llc"}, "match": false, "cached": false, "output": null, "requestId": "c1b49f01-90a1-4672-bc98-265490769a5b", "statusCode": 404, "requestDate": "2025-07-05T16:55:38.202Z", "statusMessage": "Not Found", "responseMessage": "Unable to locate valid property from address(es) provided.", "requestExecutionTimeMS": "75ms"}',
        '2025-07-05 16:55:38.12+00'
    );

--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO
    "public"."subscriptions" (
        "id",
        "user_id",
        "status",
        "metadata",
        "price_id",
        "quantity",
        "cancel_at_period_end",
        "created",
        "current_period_start",
        "current_period_end",
        "ended_at",
        "cancel_at",
        "canceled_at",
        "trial_start",
        "trial_end"
    )
VALUES (
        'sub_1RhZN3FrXwG87GjCu6HrrkzH',
        'd61399fe-c47c-4403-8668-ad8dfb1138f7',
        'active',
        '{}',
        'price_1RhZMkFrXwG87GjCiBFgW8H7',
        1,
        false,
        '2025-07-05 16:55:25+00',
        '2025-07-05 16:55:25+00',
        '2025-08-05 16:55:25+00',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    );

--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO
    "storage"."buckets" (
        "id",
        "name",
        "owner",
        "created_at",
        "updated_at",
        "public",
        "avif_autodetection",
        "file_size_limit",
        "allowed_mime_types",
        "owner_id"
    )
VALUES (
        'avatars',
        'avatars',
        NULL,
        '2025-07-04 05:12:07.200574+00',
        '2025-07-04 05:12:07.200574+00',
        true,
        false,
        NULL,
        NULL,
        NULL
    );

--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval ( '"auth"."refresh_tokens_id_seq"', 11, true );

--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval (
        '"supabase_functions"."hooks_id_seq"', 1, false
    );

--
-- PostgreSQL database dump complete
--

RESET ALL;