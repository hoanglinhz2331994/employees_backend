DROP TABLE IF EXISTS public.members;
CREATE TABLE public.members
(
    id integer NOT NULL,
    name text COLLATE pg_catalog."default",
    phone text COLLATE pg_catalog."default",
    birthday date COLLATE pg_catalog."default",
    CONSTRAINT members_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.members
    OWNER to postgres;


DROP TABLE IF EXISTS public.projects;
CREATE TABLE public.projects
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    name text COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
	member_id integer NOT NULL,
    CONSTRAINT project_pkey PRIMARY KEY (id),
	FOREIGN KEY (member_id) REFERENCES public.members(id) ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.projects
    OWNER to postgres;