--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (Debian 16.9-1.pgdg120+1)
-- Dumped by pg_dump version 16.9 (Debian 16.9-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: health_status; Type: TYPE; Schema: public; Owner: setab
--

CREATE TYPE public.health_status AS ENUM (
    'Healthy',
    'Follow-up needed',
    'Critical',
    'Not sure'
);


ALTER TYPE public.health_status OWNER TO setab;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: setab
--

CREATE TABLE public.accounts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    provider text NOT NULL,
    provider_account_id text NOT NULL,
    id_token text,
    access_token text,
    refresh_token text,
    expires_at bigint,
    token_type text DEFAULT 'Bearer'::text,
    scope text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.accounts OWNER TO setab;

--
-- Name: appointments; Type: TABLE; Schema: public; Owner: setab
--

CREATE TABLE public.appointments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    patient_id uuid NOT NULL,
    doctor_id uuid NOT NULL,
    appointment_time timestamp without time zone NOT NULL,
    reason text,
    status text DEFAULT 'scheduled'::text,
    notes text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.appointments OWNER TO setab;

--
-- Name: doctor_notes; Type: TABLE; Schema: public; Owner: setab
--

CREATE TABLE public.doctor_notes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    note text,
    status public.health_status,
    images text[],
    created_by uuid NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_by uuid NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.doctor_notes OWNER TO setab;

--
-- Name: doctors; Type: TABLE; Schema: public; Owner: setab
--

CREATE TABLE public.doctors (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    department text,
    license_number text
);


ALTER TABLE public.doctors OWNER TO setab;

--
-- Name: medical_records; Type: TABLE; Schema: public; Owner: setab
--

CREATE TABLE public.medical_records (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    patient_id uuid NOT NULL,
    doctor_id uuid NOT NULL,
    diagnosis text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    date timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    notes text,
    prescriptions text,
    procedures text,
    follow_up timestamp without time zone,
    images text[]
);


ALTER TABLE public.medical_records OWNER TO setab;

--
-- Name: patients; Type: TABLE; Schema: public; Owner: setab
--

CREATE TABLE public.patients (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    nfc_uid text NOT NULL,
    blood_type text,
    allergies text,
    last_visit timestamp without time zone
);


ALTER TABLE public.patients OWNER TO setab;

--
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: setab
--

CREATE TABLE public.refresh_tokens (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    jti text NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.refresh_tokens OWNER TO setab;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: setab
--

CREATE TABLE public.sessions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    token text NOT NULL,
    expires timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.sessions OWNER TO setab;

--
-- Name: users; Type: TABLE; Schema: public; Owner: setab
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text,
    role text NOT NULL,
    token_version integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_role_check CHECK ((role = ANY (ARRAY['admin'::text, 'doctor'::text, 'patient'::text])))
);


ALTER TABLE public.users OWNER TO setab;

--
-- Name: verification_tokens; Type: TABLE; Schema: public; Owner: setab
--

CREATE TABLE public.verification_tokens (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp without time zone NOT NULL,
    is_used boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.verification_tokens OWNER TO setab;

--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: setab
--

COPY public.accounts (id, user_id, provider, provider_account_id, id_token, access_token, refresh_token, expires_at, token_type, scope, created_at, updated_at) FROM stdin;
8a03d0da-0f3c-47b1-8e00-ab7f4fc0908e	b3d82c9d-6707-4a50-a46e-1995780b6655	Google	102805675324000850056	eyJhbGciOiJSUzI1NiIsImtpZCI6ImRkNTMwMTIwNGZjMWQ2YTBkNjhjNzgzYTM1Y2M5YzEwYjI1ZTFmNGEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzNDA2MjcxODE2NzUtdXR0MXQwNGpya3JrY2pxYmN0b3BhcWtjOGV0ZXV0dHYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzNDA2MjcxODE2NzUtdXR0MXQwNGpya3JrY2pxYmN0b3BhcWtjOGV0ZXV0dHYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDI4MDU2NzUzMjQwMDA4NTAwNTYiLCJlbWFpbCI6InRoZXNhcGllbnMwMTAwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTc1MzgxMzUzOCwibmFtZSI6IlRIRSBTQVBJRU5TIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pJS2pwMm1YVE1QLXVWOC1oLXRKcFdiUFNsUl9sVWVMYV9rOUpZMnd1cTd0ekl3QT1zOTYtYyIsImdpdmVuX25hbWUiOiJUSEUiLCJmYW1pbHlfbmFtZSI6IlNBUElFTlMiLCJpYXQiOjE3NTM4MTM4MzgsImV4cCI6MTc1MzgxNzQzOCwianRpIjoiNGY3ZTU1ZjI1MmRkNDA5NWVkYmZlMzA5NDZhNGFhZTA2Y2EyODBlZCJ9.iJ2OO-3P6wydIS2zhk1D5BuaXX7XDO1ia_vINYxcBfyxEVbT-VgFGsXJLlYB5FP3kDUkykh9C9OhVBdgU37hfl9XdPBMIaFP7ByIdFWl7p0WP8JUXKgENhTXA1_FkzhY1jyaxrptb6gcC2Dzs-j2kC7zuiFJ1dj8hLDouGDn9TtNnmCmysYhC1u2JAAD3-LdvWH7pQpak2MW1SBFUtq6fehdaPPjbB14nyCnPRiLr7oYZ9OO34dXbNonBdPu1IRAKoaO7uqm34hGwL3hoc2KSBBpVVsWATcHuvARgLXVE9UaeUTWgYzM9ht54dfoNteHPFbTnaYyNEcrVEPR1UwFGw	\N	\N	1753817438	Bearer	\N	2025-07-29 18:13:06.496847	2025-07-29 18:30:39.088245
69ebd7d2-446a-463c-8c22-916e719ed7ec	2680190b-88c3-45eb-93bf-9f46a9b07d18	Google	100106115823628582631	eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhNjNiNDM2ODM2YTkzOWI3OTViNDEyMmQzZjRkMGQyMjVkMWM3MDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzNDA2MjcxODE2NzUtdXR0MXQwNGpya3JrY2pxYmN0b3BhcWtjOGV0ZXV0dHYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzNDA2MjcxODE2NzUtdXR0MXQwNGpya3JrY2pxYmN0b3BhcWtjOGV0ZXV0dHYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDAxMDYxMTU4MjM2Mjg1ODI2MzEiLCJoZCI6ImdyaXQuY29tLmJkIiwiZW1haWwiOiJzZXRhYkBncml0LmNvbS5iZCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3NTQ0NDkzNDYsIm5hbWUiOiJTQUlEVUwgSVNMQU0gU0VUQUIiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS19yeVNmOUpQZFk0MGVIT0pyZmhWQXpuZ3o5M1JCREZHS01QUHNfcEdjRHZJNElRPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlNBSURVTCBJU0xBTSIsImZhbWlseV9uYW1lIjoiU0VUQUIiLCJpYXQiOjE3NTQ0NDk2NDYsImV4cCI6MTc1NDQ1MzI0NiwianRpIjoiOTlmODQ2ZjYwMDAyMzE2MWQzZTc1ZDVlODY1NTI5MDIxYzYzMDI1NyJ9.VJXt3dTyMTcKO4mclUJZSburiGDFdgHMlFdlzMifHqydvEvL2SUN5sSRaaOBdBEqfSUVzR5Ull0TASn32IsyRO_Hr6atSvnRABlYKsb0UDG-lzv3y3OunLmz7dgOFjhMnQprnKXj3HoP3Ui9odX4H2M2YZWqtI6GC_MZohfyeUgeKRr7nwGo4Z4RgDvNzPa2jSpsBfETgJjjbb_Wx8TOy7sEjLXOjPCnaYYDebikVxPhabegkh--CRvdCdjvGoGNDFnqtEZoNe6piQxBuptyEuprUBEKMale25y4O3Rdb31O2FfoW4zGdreHeF3Mtgb3c9DKzMC1957Ih8hwe5MiYA	\N	\N	1754453246	Bearer	\N	2025-07-31 06:26:05.251851	2025-08-06 03:07:29.099893
\.


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: setab
--

COPY public.appointments (id, patient_id, doctor_id, appointment_time, reason, status, notes, created_at) FROM stdin;
5391de69-ff0f-47a5-8339-10f51167dcdb	3a4a2ea9-1e7b-4289-9973-f8b97bbe8fe5	5712d38b-dc8b-4d65-8c42-9478e277eeb4	2024-07-28 10:00:00	Routine check-up	scheduled	\N	2025-07-26 14:58:57.392171
1d9c9108-b89d-4b16-a243-75aeaa583f2f	d4650400-0484-4af8-ad27-36a4269c6f66	5712d38b-dc8b-4d65-8c42-9478e277eeb4	2024-08-28 10:00:00	Routine check-up	scheduled	\N	2025-07-26 15:00:03.958758
45a207b8-ebb3-45af-bcc8-8541b0db5609	d4650400-0484-4af8-ad27-36a4269c6f66	2182d353-02c6-4621-be4b-b06bd371de25	2024-08-28 10:00:00	Routine check-up	scheduled	\N	2025-07-26 15:01:23.769599
59ef8288-1c5b-4aff-8e71-ef1416482053	d4650400-0484-4af8-ad27-36a4269c6f66	2182d353-02c6-4621-be4b-b06bd371de25	2024-08-28 10:00:00	Routine check-up	scheduled	\N	2025-07-31 19:26:34.011175
204fba97-4709-495c-b3f8-582aeb4e2c90	d4650400-0484-4af8-ad27-36a4269c6f66	2182d353-02c6-4621-be4b-b06bd371de25	2024-08-28 10:00:00	Routine check-up	scheduled	\N	2025-07-31 19:29:30.438081
e6fb6f19-1d37-42e3-8784-ecc424bd0608	d4650400-0484-4af8-ad27-36a4269c6f66	2182d353-02c6-4621-be4b-b06bd371de25	2024-08-28 10:00:00	Routine check-up	scheduled	\N	2025-07-31 19:32:30.022711
\.


--
-- Data for Name: doctor_notes; Type: TABLE DATA; Schema: public; Owner: setab
--

COPY public.doctor_notes (id, user_id, note, status, images, created_by, created_at, updated_by, updated_at) FROM stdin;
\.


--
-- Data for Name: doctors; Type: TABLE DATA; Schema: public; Owner: setab
--

COPY public.doctors (id, user_id, department, license_number) FROM stdin;
5712d38b-dc8b-4d65-8c42-9478e277eeb4	11f729dc-9363-4310-9fb6-7eabdf259c5a	Cardiology	DOC12345
2182d353-02c6-4621-be4b-b06bd371de25	f462a8c0-b8c0-4f4d-a86a-b6ccf7b449cd	Neurology	DOC67890
\.


--
-- Data for Name: medical_records; Type: TABLE DATA; Schema: public; Owner: setab
--

COPY public.medical_records (id, patient_id, doctor_id, diagnosis, created_at, date, notes, prescriptions, procedures, follow_up, images) FROM stdin;
8697122d-0376-4d8b-8db6-cd041cc10e5d	3a4a2ea9-1e7b-4289-9973-f8b97bbe8fe5	5712d38b-dc8b-4d65-8c42-9478e277eeb4	Regular check-up, no issues	2025-07-15 11:22:10.60003	2025-07-31 20:09:07.655455	\N	\N	\N	\N	\N
6d462a3c-1c69-4f74-837e-efa62982e44f	d4650400-0484-4af8-ad27-36a4269c6f66	2182d353-02c6-4621-be4b-b06bd371de25	Prescribed antihistamines for allergy	2025-07-15 11:22:10.60003	2025-07-31 20:09:07.655455	\N	\N	\N	\N	\N
f7522349-e7d4-429d-be74-15cefd0a96da	bf30e3da-d699-4308-ab2e-b0f94e832f42	5712d38b-dc8b-4d65-8c42-9478e277eeb4	Blood pressure slightly elevated. Advised low-salt diet.	2025-07-15 11:22:10.60003	2025-07-31 20:09:07.655455	\N	\N	\N	\N	\N
19316448-024a-407d-b0f4-cb097a78989a	d4650400-0484-4af8-ad27-36a4269c6f66	2182d353-02c6-4621-be4b-b06bd371de25	Routine Checkup	2025-07-31 20:15:21.403358	2024-05-20 14:00:00	No issues found. Patient in good health.	\N	Physical examination	\N	\N
480fd282-85fc-4828-a07e-e0fde718c359	d4650400-0484-4af8-ad27-36a4269c6f66	2182d353-02c6-4621-be4b-b06bd371de25	Hypertension	2025-07-31 20:15:21.403358	2024-07-01 09:00:00	Patient advised to reduce salt intake.	Amlodipine 5mg daily	Blood pressure measurement	2024-08-01 09:00:00	{image.jpg,image1.jpeg}
3a102515-0909-4bb3-bc56-bb7f08c9653c	d4650400-0484-4af8-ad27-36a4269c6f66	5712d38b-dc8b-4d65-8c42-9478e277eeb4	Seasonal Allergies	2025-07-31 20:15:21.403358	2024-06-15 10:30:00	Prescribed antihistamines.	Cetirizine 10mg daily	Allergy test	\N	{image.png,image1.jpeg}
\.


--
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: setab
--

COPY public.patients (id, user_id, nfc_uid, blood_type, allergies, last_visit) FROM stdin;
3a4a2ea9-1e7b-4289-9973-f8b97bbe8fe5	9cf4189a-6509-4666-ad3d-b4e8aa677c65	04A1B2C3D4	O+	None	2025-07-15 11:22:02.126975
d4650400-0484-4af8-ad27-36a4269c6f66	475490be-dc84-4f9f-93b1-000ff378ab0b	04D4C3B2A1	A+	Penicillin	2025-07-15 11:22:02.126975
bf30e3da-d699-4308-ab2e-b0f94e832f42	9a07c5bc-ca02-4e2c-8207-ec83ce5a14ba	12345678AB	B-	Peanuts	2025-07-15 11:22:02.126975
2f3429bd-46e4-4b73-8dbe-5c6d2524ce53	ee2b5389-8627-4fbc-aacc-7a4d1bc7e417	87654321CD	AB+	None	2025-07-15 11:22:02.126975
4f997c7a-a3a8-48ac-94ed-03c3e4b11c58	691fb81b-163f-41da-b77c-65abfd9e461d	0FAB12CD34	A-	Latex	2025-07-15 11:22:02.126975
d35e6be0-b689-495c-9713-ed96bcd5a877	126f66ff-4684-44dd-8c65-1676627dd109	AA11BB22CC	O-	Sulfa Drugs	2025-07-15 11:22:02.126975
5126570b-e875-43ee-abb4-e93db5be63d6	d1ab5461-e205-43be-8817-62f124118fde	FE12DC34BA	B+	Shellfish	2025-07-15 11:22:02.126975
977ae695-4ab1-4f3c-85a0-e087ae13fe11	b3d82c9d-6707-4a50-a46e-1995780b6655	GOOGLE_b3d82c9d	\N	\N	\N
ce9307e5-6ef6-48a4-861d-820a60e2bd0e	2680190b-88c3-45eb-93bf-9f46a9b07d18	GOOGLE_2680190b	\N	\N	\N
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: setab
--

COPY public.refresh_tokens (id, user_id, jti, expires_at, created_at) FROM stdin;
73431b60-5ae6-4205-8404-bbfc8a264e05	9cf4189a-6509-4666-ad3d-b4e8aa677c65	token1	2025-07-22 11:22:19.753567	2025-07-15 11:22:19.753567
7577b1ce-811f-41bb-9cde-7a547c0a2c44	11f729dc-9363-4310-9fb6-7eabdf259c5a	token2	2025-07-22 11:22:19.753567	2025-07-15 11:22:19.753567
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: setab
--

COPY public.sessions (id, user_id, token, expires, created_at) FROM stdin;
bb01a9f0-f662-4697-8860-e9596f5a544e	b3d82c9d-6707-4a50-a46e-1995780b6655	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYjNkODJjOWQtNjcwNy00YTUwLWE0NmUtMTk5NTc4MGI2NjU1IiwibmFtZSI6IlRIRSBTQVBJRU5TIiwiZW1haWwiOiJ0aGVzYXBpZW5zMDEwMDAxQGdtYWlsLmNvbSIsImlhdCI6MTc1MzgxMjc4NiwiZXhwIjoxNzU1MTA4Nzg2fQ.sZfVheci_baiEXWOsnDMq7pveD7Jws9nuFQMeSdH0to	2025-08-13 18:13:06.543	2025-07-29 18:13:06.496847
e7998bf1-c973-49d6-ab2b-a2519349a70a	b3d82c9d-6707-4a50-a46e-1995780b6655	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYjNkODJjOWQtNjcwNy00YTUwLWE0NmUtMTk5NTc4MGI2NjU1IiwibmFtZSI6IlRIRSBTQVBJRU5TIiwiZW1haWwiOiJ0aGVzYXBpZW5zMDEwMDAxQGdtYWlsLmNvbSIsImlhdCI6MTc1MzgxMjgwMiwiZXhwIjoxNzU1MTA4ODAyfQ.rjlL8ZYez18m_eYVkXmdiSC1Ze7i_uB7dj5-j6nXeRA	2025-08-13 18:13:22.499	2025-07-29 18:13:22.485225
183a5ec7-6999-40ba-89ab-b08d566f029e	b3d82c9d-6707-4a50-a46e-1995780b6655	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYjNkODJjOWQtNjcwNy00YTUwLWE0NmUtMTk5NTc4MGI2NjU1IiwibmFtZSI6IlRIRSBTQVBJRU5TIiwiZW1haWwiOiJ0aGVzYXBpZW5zMDEwMDAxQGdtYWlsLmNvbSIsImlhdCI6MTc1MzgxMjg0MywiZXhwIjoxNzU1MTA4ODQzfQ.RYPd_edIWpXercPmp1fAA1xvg8kP_efS0dehUddTEu8	2025-08-13 18:14:03.311	2025-07-29 18:14:03.288772
e35ec5de-2f28-4742-b7ec-1f1a3088ca12	b3d82c9d-6707-4a50-a46e-1995780b6655	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYjNkODJjOWQtNjcwNy00YTUwLWE0NmUtMTk5NTc4MGI2NjU1IiwibmFtZSI6IlRIRSBTQVBJRU5TIiwiZW1haWwiOiJ0aGVzYXBpZW5zMDEwMDAxQGdtYWlsLmNvbSIsImlhdCI6MTc1MzgxMzI4MCwiZXhwIjoxNzU1MTA5MjgwfQ.BmDAqrKT-HLM7War65UKqXwH4X1CEDtuyOdKc2Cg2NA	2025-08-13 18:21:20.606	2025-07-29 18:21:20.596702
1f9ee069-1105-4529-9ce8-99b4bc0611b5	b3d82c9d-6707-4a50-a46e-1995780b6655	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYjNkODJjOWQtNjcwNy00YTUwLWE0NmUtMTk5NTc4MGI2NjU1IiwibmFtZSI6IlRIRSBTQVBJRU5TIiwiZW1haWwiOiJ0aGVzYXBpZW5zMDEwMDAxQGdtYWlsLmNvbSIsImlhdCI6MTc1MzgxMzMxNiwiZXhwIjoxNzU1MTA5MzE2fQ.TFILqr1HHgJHmpZSh0TIIlIukRndIyaY5ODdGXczAqs	2025-08-13 18:21:56.668	2025-07-29 18:21:56.654963
e1b499e2-1bd7-4508-ba9a-2dea1513a91f	b3d82c9d-6707-4a50-a46e-1995780b6655	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYjNkODJjOWQtNjcwNy00YTUwLWE0NmUtMTk5NTc4MGI2NjU1IiwibmFtZSI6IlRIRSBTQVBJRU5TIiwiZW1haWwiOiJ0aGVzYXBpZW5zMDEwMDAxQGdtYWlsLmNvbSIsImlhdCI6MTc1MzgxMzY2NCwiZXhwIjoxNzU1MTA5NjY0fQ.imreg8cYPZGsQPqEdwqN99Sy9D5x5x2-lRPItiVmNZk	2025-08-13 18:27:44.532	2025-07-29 18:27:44.520744
e8524cac-286e-40d7-8acc-d226d6a26f81	b3d82c9d-6707-4a50-a46e-1995780b6655	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYjNkODJjOWQtNjcwNy00YTUwLWE0NmUtMTk5NTc4MGI2NjU1IiwibmFtZSI6IlRIRSBTQVBJRU5TIiwiZW1haWwiOiJ0aGVzYXBpZW5zMDEwMDAxQGdtYWlsLmNvbSIsImlhdCI6MTc1MzgxMzc0NCwiZXhwIjoxNzU1MTA5NzQ0fQ.fgZgspFnZpETCOnWuhD48r15DR07VFZbpzdoqUT2KdI	2025-08-13 18:29:04.707	2025-07-29 18:29:04.698385
fca0bc36-f4e6-4268-baa6-2ba0dab275a3	b3d82c9d-6707-4a50-a46e-1995780b6655	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYjNkODJjOWQtNjcwNy00YTUwLWE0NmUtMTk5NTc4MGI2NjU1IiwibmFtZSI6IlRIRSBTQVBJRU5TIiwiZW1haWwiOiJ0aGVzYXBpZW5zMDEwMDAxQGdtYWlsLmNvbSIsImlhdCI6MTc1MzgxMzc1NywiZXhwIjoxNzU1MTA5NzU3fQ.8Kx6_5V8IITVl_gUFKzTtef2T837Zojsrf5478LKVyY	2025-08-13 18:29:17.676	2025-07-29 18:29:17.661649
7710f432-0cd5-4e7e-b698-7591c957cad7	b3d82c9d-6707-4a50-a46e-1995780b6655	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYjNkODJjOWQtNjcwNy00YTUwLWE0NmUtMTk5NTc4MGI2NjU1IiwibmFtZSI6IlRIRSBTQVBJRU5TIiwiZW1haWwiOiJ0aGVzYXBpZW5zMDEwMDAxQGdtYWlsLmNvbSIsImlhdCI6MTc1MzgxMzc2MiwiZXhwIjoxNzU1MTA5NzYyfQ.3T9ujKgcLGWGb5_4dJE1t26dKQ1SBFZGJX911SI2_YM	2025-08-13 18:29:22.437	2025-07-29 18:29:22.421045
76a2f849-eb48-40cf-9c95-99fc08d9ee50	b3d82c9d-6707-4a50-a46e-1995780b6655	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYjNkODJjOWQtNjcwNy00YTUwLWE0NmUtMTk5NTc4MGI2NjU1IiwibmFtZSI6IlRIRSBTQVBJRU5TIiwiZW1haWwiOiJ0aGVzYXBpZW5zMDEwMDAxQGdtYWlsLmNvbSIsImlhdCI6MTc1MzgxMzgzOSwiZXhwIjoxNzU1MTA5ODM5fQ.vCzhwKRIMmELLH2t9VgNsH2ySFcbMrFISwYAv_I9Djo	2025-08-13 18:30:39.101	2025-07-29 18:30:39.088245
86affa0e-2ef8-461b-9e70-dce8404516c3	2680190b-88c3-45eb-93bf-9f46a9b07d18	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjY4MDE5MGItODhjMy00NWViLTkzYmYtOWY0NmE5YjA3ZDE4IiwibmFtZSI6IlNBSURVTCBJU0xBTSBTRVRBQiIsImVtYWlsIjoic2V0YWJAZ3JpdC5jb20uYmQiLCJpYXQiOjE3NTM5NDMxNjUsImV4cCI6MTc1NTIzOTE2NX0.5ddr7v6fvDwB25Nbu75CcDJQ3of7mzSXfjnhV_XRDi0	2025-08-15 06:26:05.268	2025-07-31 06:26:05.251851
5c04bfaa-0756-4313-a3fa-ddc04020a9ca	2680190b-88c3-45eb-93bf-9f46a9b07d18	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjY4MDE5MGItODhjMy00NWViLTkzYmYtOWY0NmE5YjA3ZDE4IiwibmFtZSI6IlNBSURVTCBJU0xBTSBTRVRBQiIsImVtYWlsIjoic2V0YWJAZ3JpdC5jb20uYmQiLCJpYXQiOjE3NTM5NDMyMTAsImV4cCI6MTc1NTIzOTIxMH0.kLkuluSvK66bNgEDOj61TCIonDNuRDI1e5vWJuetNHQ	2025-08-15 06:26:50.479	2025-07-31 06:26:50.464358
ed09cc05-d368-4db9-818f-f08cedcb7815	2680190b-88c3-45eb-93bf-9f46a9b07d18	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjY4MDE5MGItODhjMy00NWViLTkzYmYtOWY0NmE5YjA3ZDE4IiwibmFtZSI6IlNBSURVTCBJU0xBTSBTRVRBQiIsImVtYWlsIjoic2V0YWJAZ3JpdC5jb20uYmQiLCJpYXQiOjE3NTM5NDMyMTcsImV4cCI6MTc1NTIzOTIxN30.DwBlU2T53yrO1lHzapclBdLeaHf704yuPI05Qe63fV4	2025-08-15 06:26:57.242	2025-07-31 06:26:57.22666
205a75e5-3a49-4077-aee1-9455d95260ad	2680190b-88c3-45eb-93bf-9f46a9b07d18	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjY4MDE5MGItODhjMy00NWViLTkzYmYtOWY0NmE5YjA3ZDE4IiwibmFtZSI6IlNBSURVTCBJU0xBTSBTRVRBQiIsImVtYWlsIjoic2V0YWJAZ3JpdC5jb20uYmQiLCJpYXQiOjE3NTM5NDM1NjUsImV4cCI6MTc1NTIzOTU2NX0.EabIk6Pn5nxVWG_pSyek2Hys_i-nZZMyZSrNHOpLEs4	2025-08-15 06:32:45.712	2025-07-31 06:32:45.704325
342fa9c1-f8de-4125-aab7-fb2278f64dd9	2680190b-88c3-45eb-93bf-9f46a9b07d18	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjY4MDE5MGItODhjMy00NWViLTkzYmYtOWY0NmE5YjA3ZDE4IiwibmFtZSI6IlNBSURVTCBJU0xBTSBTRVRBQiIsImVtYWlsIjoic2V0YWJAZ3JpdC5jb20uYmQiLCJpYXQiOjE3NTM5NDM2MTUsImV4cCI6MTc1NTIzOTYxNX0.H6-JXxRM0jeRCioGyI4dy53PJyvtsxainJjawtmzyaU	2025-08-15 06:33:35.27	2025-07-31 06:33:35.261542
23cd9797-de64-4b8c-a301-cb46451f48ea	2680190b-88c3-45eb-93bf-9f46a9b07d18	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjY4MDE5MGItODhjMy00NWViLTkzYmYtOWY0NmE5YjA3ZDE4IiwibmFtZSI6IlNBSURVTCBJU0xBTSBTRVRBQiIsImVtYWlsIjoic2V0YWJAZ3JpdC5jb20uYmQiLCJpYXQiOjE3NTM5NDM3ODEsImV4cCI6MTc1NTIzOTc4MX0.WdCeBWjGTyMXImMLS3tHlJlTDH8RxlMxqDTbvWhx-eg	2025-08-15 06:36:21.516	2025-07-31 06:36:21.505371
9cdaf8d3-05d5-41d0-aab3-615e4450ea3b	2680190b-88c3-45eb-93bf-9f46a9b07d18	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjY4MDE5MGItODhjMy00NWViLTkzYmYtOWY0NmE5YjA3ZDE4IiwibmFtZSI6IlNBSURVTCBJU0xBTSBTRVRBQiIsImVtYWlsIjoic2V0YWJAZ3JpdC5jb20uYmQiLCJpYXQiOjE3NTM5NDM3ODcsImV4cCI6MTc1NTIzOTc4N30.NidFDIaSRx_PHkRzNwmkCIA7HJkjA_zaSFBzIPPZ7YQ	2025-08-15 06:36:27.681	2025-07-31 06:36:27.672166
92575c85-dd67-4f95-a985-6700388a17e9	2680190b-88c3-45eb-93bf-9f46a9b07d18	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjY4MDE5MGItODhjMy00NWViLTkzYmYtOWY0NmE5YjA3ZDE4IiwibmFtZSI6IlNBSURVTCBJU0xBTSBTRVRBQiIsImVtYWlsIjoic2V0YWJAZ3JpdC5jb20uYmQiLCJpYXQiOjE3NTM5NDM4MDMsImV4cCI6MTc1NTIzOTgwM30.7r43FDWlkZreBNKqMb0RxOnJaI0gseT37YYtxAj5UOY	2025-08-15 06:36:43.659	2025-07-31 06:36:43.644911
c0fe4bb3-6a41-4e88-a80d-f5379cc29579	2680190b-88c3-45eb-93bf-9f46a9b07d18	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjY4MDE5MGItODhjMy00NWViLTkzYmYtOWY0NmE5YjA3ZDE4IiwibmFtZSI6IlNBSURVTCBJU0xBTSBTRVRBQiIsImVtYWlsIjoic2V0YWJAZ3JpdC5jb20uYmQiLCJpYXQiOjE3NTM5NDM4NjEsImV4cCI6MTc1NTIzOTg2MX0.bZkWt__GYsEApWohBkedpWi-4FRYFJNFv5ZHP1nquHA	2025-08-15 06:37:41.938	2025-07-31 06:37:41.923049
59200ce5-6983-4fc8-933c-2843a74b2cf7	2680190b-88c3-45eb-93bf-9f46a9b07d18	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjY4MDE5MGItODhjMy00NWViLTkzYmYtOWY0NmE5YjA3ZDE4IiwibmFtZSI6IlNBSURVTCBJU0xBTSBTRVRBQiIsImVtYWlsIjoic2V0YWJAZ3JpdC5jb20uYmQiLCJpYXQiOjE3NTM5NDQyNzIsImV4cCI6MTc1NTI0MDI3Mn0.cRiUcaLw60vjg4ZYHLeAjHKbarIdmHJO55BZqdlAOYI	2025-08-15 06:44:32.857	2025-07-31 06:44:32.834711
7ca9f740-619f-4cff-a2a9-7d4c614cc0f8	2680190b-88c3-45eb-93bf-9f46a9b07d18	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjY4MDE5MGItODhjMy00NWViLTkzYmYtOWY0NmE5YjA3ZDE4IiwibmFtZSI6IlNBSURVTCBJU0xBTSBTRVRBQiIsImVtYWlsIjoic2V0YWJAZ3JpdC5jb20uYmQiLCJpYXQiOjE3NTM5NDQzNzcsImV4cCI6MTc1NTI0MDM3N30.F-irIy2NWIDMcfM5aUJV7ahGnH3KFB3g1uAQD5dHmY4	2025-08-15 06:46:17.111	2025-07-31 06:46:17.102412
c3712b6d-2b82-4b9d-90eb-cf298a0cd7b9	2680190b-88c3-45eb-93bf-9f46a9b07d18	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjY4MDE5MGItODhjMy00NWViLTkzYmYtOWY0NmE5YjA3ZDE4IiwibmFtZSI6IlNBSURVTCBJU0xBTSBTRVRBQiIsImVtYWlsIjoic2V0YWJAZ3JpdC5jb20uYmQiLCJpYXQiOjE3NTM5NDQ0MzMsImV4cCI6MTc1NTI0MDQzM30.QUSMcGiIhwVhKWzmB8IlileKkejNL2yCE7lnM8iTZCY	2025-08-15 06:47:13.905	2025-07-31 06:47:13.895974
f8dfce4c-f096-48e0-a519-5f868ac3ede7	2680190b-88c3-45eb-93bf-9f46a9b07d18	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjY4MDE5MGItODhjMy00NWViLTkzYmYtOWY0NmE5YjA3ZDE4IiwibmFtZSI6IlNBSURVTCBJU0xBTSBTRVRBQiIsImVtYWlsIjoic2V0YWJAZ3JpdC5jb20uYmQiLCJpYXQiOjE3NTM5NDQ0NjgsImV4cCI6MTc1NTI0MDQ2OH0.M8e9DHR-vvFdtMQi-oFzgtYZWyDfOyXEZj_ur3fGfCg	2025-08-15 06:47:48.427	2025-07-31 06:47:48.418971
c6a0617c-2321-470e-884b-6497bc197abb	2680190b-88c3-45eb-93bf-9f46a9b07d18	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjY4MDE5MGItODhjMy00NWViLTkzYmYtOWY0NmE5YjA3ZDE4IiwibmFtZSI6IlNBSURVTCBJU0xBTSBTRVRBQiIsImVtYWlsIjoic2V0YWJAZ3JpdC5jb20uYmQiLCJpYXQiOjE3NTM5NDQ1OTUsImV4cCI6MTc1NTI0MDU5NX0.G66wE5VZH55ECGs8DwlYalFtfq9yasYJbDrrnnIJRTk	2025-08-15 06:49:55.635	2025-07-31 06:49:55.625165
1885d319-d63a-4756-a78a-6e94ff7db83d	2680190b-88c3-45eb-93bf-9f46a9b07d18	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjY4MDE5MGItODhjMy00NWViLTkzYmYtOWY0NmE5YjA3ZDE4IiwibmFtZSI6IlNBSURVTCBJU0xBTSBTRVRBQiIsImVtYWlsIjoic2V0YWJAZ3JpdC5jb20uYmQiLCJpYXQiOjE3NTM5NDUxNTcsImV4cCI6MTc1NTI0MTE1N30.WW3HHLnL1nxGS8edYs1o5WwSfsn5x8j6jIuit_O8h18	2025-08-15 06:59:17.724	2025-07-31 06:59:17.717334
bd97c14a-bc43-416b-a191-cdfedd9ed1fa	2680190b-88c3-45eb-93bf-9f46a9b07d18	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjY4MDE5MGItODhjMy00NWViLTkzYmYtOWY0NmE5YjA3ZDE4IiwibmFtZSI6IlNBSURVTCBJU0xBTSBTRVRBQiIsImVtYWlsIjoic2V0YWJAZ3JpdC5jb20uYmQiLCJyb2xlIjoicGF0aWVudCIsImlhdCI6MTc1Mzk0NTQxMSwiZXhwIjoxNzU1MjQxNDExfQ.zej3QAD4h4oDW2JJpF_xiT18EnTKcvyAadRvcaE7Q20	2025-08-15 07:03:31.829	2025-07-31 07:03:31.820666
a1641972-e77d-4997-b0e5-b8904f1e32e2	2680190b-88c3-45eb-93bf-9f46a9b07d18	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjY4MDE5MGItODhjMy00NWViLTkzYmYtOWY0NmE5YjA3ZDE4IiwibmFtZSI6IlNBSURVTCBJU0xBTSBTRVRBQiIsImVtYWlsIjoic2V0YWJAZ3JpdC5jb20uYmQiLCJyb2xlIjoicGF0aWVudCIsImlhdCI6MTc1NDQ0OTY0OSwiZXhwIjoxNzU1NzQ1NjQ5fQ.-r6lD1uKnz1J3Ggq1jS1A9XFkEOM6gMH2yZSg6sIxGQ	2025-08-21 03:07:29.109	2025-08-06 03:07:29.099893
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: setab
--

COPY public.users (id, name, email, password, role, token_version, created_at) FROM stdin;
bfaa4312-b873-4095-ab64-b5077ded142b	Admin One	admin1@example.com	hashedpassword1	admin	0	2025-07-15 11:21:26.397995
f462a8c0-b8c0-4f4d-a86a-b6ccf7b449cd	Dr. Tanvir Hasan	dr.tanvir@example.com	hashedpassword3	doctor	0	2025-07-15 11:21:26.397995
9cf4189a-6509-4666-ad3d-b4e8aa677c65	Mehedi Hasan	mehedi@example.com	hashedpassword4	patient	0	2025-07-15 11:21:26.397995
74350f8f-7b4b-4e95-a379-0ffc244284e8	setab	setab@gmail.com	$2b$10$BDh08kIWa5ltFIEwZgbp2.ajmGJcQ1oYDlWMELDOhd9CkFR1Y0dEO	patient	0	2025-07-16 08:31:38.880321
e471be72-b47e-4ddd-bd04-aad726a38e9b	adminsetab	admin@example.com	$2b$10$aUPn9/aBNh2QmXqbLQI4EOuXjqgCpcmZEzt1cQlLPF0fOUx4Lp7uu	admin	0	2025-07-20 14:29:35.010176
11f729dc-9363-4310-9fb6-7eabdf259c5a	Dr. Ayesha Rahman	dr.ayesha@example.com	$2a$10$ODbPPa5bODoEjV5enm8awOiUt7amIlhtx8O1.FBhM4Mu8pfjL3qd.	doctor	0	2025-07-15 11:21:26.397995
475490be-dc84-4f9f-93b1-000ff378ab0b	Sadia Khatun	sadia@example.com	$2b$10$BDh08kIWa5ltFIEwZgbp2.ajmGJcQ1oYDlWMELDOhd9CkFR1Y0dEO	patient	0	2025-07-15 11:21:26.397995
9a07c5bc-ca02-4e2c-8207-ec83ce5a14ba	Rasel Ahmed	rasel@example.com	$2b$10$BDh08kIWa5ltFIEwZgbp2.ajmGJcQ1oYDlWMELDOhd9CkFR1Y0dEO	patient	0	2025-07-15 11:21:26.397995
ee2b5389-8627-4fbc-aacc-7a4d1bc7e417	Nusrat Jahan	nusrat@example.com	$2b$10$BDh08kIWa5ltFIEwZgbp2.ajmGJcQ1oYDlWMELDOhd9CkFR1Y0dEO	patient	0	2025-07-15 11:21:26.397995
691fb81b-163f-41da-b77c-65abfd9e461d	Fahim Hossain	fahim@example.com	$2b$10$BDh08kIWa5ltFIEwZgbp2.ajmGJcQ1oYDlWMELDOhd9CkFR1Y0dEO	patient	0	2025-07-15 11:21:26.397995
126f66ff-4684-44dd-8c65-1676627dd109	Rumi Akter	rumi@example.com	$2b$10$BDh08kIWa5ltFIEwZgbp2.ajmGJcQ1oYDlWMELDOhd9CkFR1Y0dEO	patient	0	2025-07-15 11:21:26.397995
d1ab5461-e205-43be-8817-62f124118fde	Jubayer Shanto	jubayer@example.com	$2b$10$BDh08kIWa5ltFIEwZgbp2.ajmGJcQ1oYDlWMELDOhd9CkFR1Y0dEO	patient	0	2025-07-15 11:21:26.397995
b3d82c9d-6707-4a50-a46e-1995780b6655	THE SAPIENS	thesapiens010001@gmail.com	\N	patient	0	2025-07-29 18:13:06.496847
2680190b-88c3-45eb-93bf-9f46a9b07d18	SAIDUL ISLAM SETAB	setab@grit.com.bd	\N	patient	0	2025-07-31 06:26:05.251851
\.


--
-- Data for Name: verification_tokens; Type: TABLE DATA; Schema: public; Owner: setab
--

COPY public.verification_tokens (id, identifier, token, expires, is_used, created_at) FROM stdin;
\.


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- Name: accounts accounts_provider_provider_account_id_key; Type: CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_provider_provider_account_id_key UNIQUE (provider, provider_account_id);


--
-- Name: accounts accounts_user_id_provider_key; Type: CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_user_id_provider_key UNIQUE (user_id, provider);


--
-- Name: appointments appointments_pkey; Type: CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (id);


--
-- Name: doctor_notes doctor_notes_pkey; Type: CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.doctor_notes
    ADD CONSTRAINT doctor_notes_pkey PRIMARY KEY (id);


--
-- Name: doctors doctors_license_number_key; Type: CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_license_number_key UNIQUE (license_number);


--
-- Name: doctors doctors_pkey; Type: CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pkey PRIMARY KEY (id);


--
-- Name: doctors doctors_user_id_key; Type: CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_user_id_key UNIQUE (user_id);


--
-- Name: medical_records medical_records_pkey; Type: CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.medical_records
    ADD CONSTRAINT medical_records_pkey PRIMARY KEY (id);


--
-- Name: patients patients_nfc_uid_key; Type: CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_nfc_uid_key UNIQUE (nfc_uid);


--
-- Name: patients patients_pkey; Type: CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (id);


--
-- Name: patients patients_user_id_key; Type: CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_user_id_key UNIQUE (user_id);


--
-- Name: refresh_tokens refresh_tokens_jti_key; Type: CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_jti_key UNIQUE (jti);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: verification_tokens verification_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.verification_tokens
    ADD CONSTRAINT verification_tokens_pkey PRIMARY KEY (id);


--
-- Name: verification_tokens verification_tokens_token_key; Type: CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.verification_tokens
    ADD CONSTRAINT verification_tokens_token_key UNIQUE (token);


--
-- Name: accounts accounts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: appointments appointments_doctor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.doctors(id) ON DELETE CASCADE;


--
-- Name: appointments appointments_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON DELETE CASCADE;


--
-- Name: doctor_notes doctor_notes_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.doctor_notes
    ADD CONSTRAINT doctor_notes_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: doctor_notes doctor_notes_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.doctor_notes
    ADD CONSTRAINT doctor_notes_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: doctor_notes doctor_notes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.doctor_notes
    ADD CONSTRAINT doctor_notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: doctors doctors_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: medical_records medical_records_doctor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.medical_records
    ADD CONSTRAINT medical_records_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.doctors(id) ON DELETE CASCADE;


--
-- Name: medical_records medical_records_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.medical_records
    ADD CONSTRAINT medical_records_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON DELETE CASCADE;


--
-- Name: patients patients_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: setab
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

