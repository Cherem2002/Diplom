PGDMP         7                |            Diplom    15.1    15.1 %    )           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            *           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            +           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ,           1262    65697    Diplom    DATABASE     |   CREATE DATABASE "Diplom" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "Diplom";
                postgres    false            �            1259    65705    SQL    TABLE     W   CREATE TABLE public."SQL" (
    id_sql integer NOT NULL,
    name_sql text NOT NULL
);
    DROP TABLE public."SQL";
       public         heap    postgres    false            �            1259    65755    field    TABLE     �   CREATE TABLE public.field (
    id_field integer NOT NULL,
    type_field integer NOT NULL,
    id_table integer NOT NULL,
    name_field text NOT NULL
);
    DROP TABLE public.field;
       public         heap    postgres    false            �            1259    65754    field_id_field_seq    SEQUENCE     �   ALTER TABLE public.field ALTER COLUMN id_field ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.field_id_field_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999
    CACHE 1
);
            public          postgres    false    222            �            1259    65728    scheme    TABLE     s   CREATE TABLE public.scheme (
    id_scheme integer NOT NULL,
    id_user integer NOT NULL,
    name_scheme text
);
    DROP TABLE public.scheme;
       public         heap    postgres    false            �            1259    65727    scheme_id_scheme_seq    SEQUENCE     �   ALTER TABLE public.scheme ALTER COLUMN id_scheme ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.scheme_id_scheme_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999
    CACHE 1
);
            public          postgres    false    218            �            1259    65742    table    TABLE     }   CREATE TABLE public."table" (
    id_table integer NOT NULL,
    id_scheme integer NOT NULL,
    name_table text NOT NULL
);
    DROP TABLE public."table";
       public         heap    postgres    false            �            1259    65741    table_id_table_seq    SEQUENCE     �   ALTER TABLE public."table" ALTER COLUMN id_table ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.table_id_table_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999
    CACHE 1
);
            public          postgres    false    220            �            1259    65768    type    TABLE     X   CREATE TABLE public.type (
    id_type integer NOT NULL,
    name_type text NOT NULL
);
    DROP TABLE public.type;
       public         heap    postgres    false            �            1259    65767    type_id_type_seq    SEQUENCE     �   ALTER TABLE public.type ALTER COLUMN id_type ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.type_id_type_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999
    CACHE 1
);
            public          postgres    false    224            �            1259    65720    users    TABLE     _   CREATE TABLE public.users (
    id_user integer NOT NULL,
    email text,
    password text
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    65719    users_id_user_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id_user ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999
    CACHE 1
);
            public          postgres    false    216                      0    65705    SQL 
   TABLE DATA           1   COPY public."SQL" (id_sql, name_sql) FROM stdin;
    public          postgres    false    214   �&       $          0    65755    field 
   TABLE DATA           K   COPY public.field (id_field, type_field, id_table, name_field) FROM stdin;
    public          postgres    false    222   �&                  0    65728    scheme 
   TABLE DATA           A   COPY public.scheme (id_scheme, id_user, name_scheme) FROM stdin;
    public          postgres    false    218   �&       "          0    65742    table 
   TABLE DATA           B   COPY public."table" (id_table, id_scheme, name_table) FROM stdin;
    public          postgres    false    220   '       &          0    65768    type 
   TABLE DATA           2   COPY public.type (id_type, name_type) FROM stdin;
    public          postgres    false    224   /'                 0    65720    users 
   TABLE DATA           9   COPY public.users (id_user, email, password) FROM stdin;
    public          postgres    false    216   L'       -           0    0    field_id_field_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.field_id_field_seq', 1, false);
          public          postgres    false    221            .           0    0    scheme_id_scheme_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.scheme_id_scheme_seq', 1, false);
          public          postgres    false    217            /           0    0    table_id_table_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.table_id_table_seq', 1, false);
          public          postgres    false    219            0           0    0    type_id_type_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.type_id_type_seq', 1, false);
          public          postgres    false    223            1           0    0    users_id_user_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_id_user_seq', 2, true);
          public          postgres    false    215            ~           2606    65711    SQL SQL_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."SQL"
    ADD CONSTRAINT "SQL_pkey" PRIMARY KEY (id_sql);
 :   ALTER TABLE ONLY public."SQL" DROP CONSTRAINT "SQL_pkey";
       public            postgres    false    214            �           2606    65761    field field_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.field
    ADD CONSTRAINT field_pkey PRIMARY KEY (id_field);
 :   ALTER TABLE ONLY public.field DROP CONSTRAINT field_pkey;
       public            postgres    false    222            �           2606    65734    scheme scheme_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.scheme
    ADD CONSTRAINT scheme_pkey PRIMARY KEY (id_scheme);
 <   ALTER TABLE ONLY public.scheme DROP CONSTRAINT scheme_pkey;
       public            postgres    false    218            �           2606    65748    table table_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."table"
    ADD CONSTRAINT table_pkey PRIMARY KEY (id_table);
 <   ALTER TABLE ONLY public."table" DROP CONSTRAINT table_pkey;
       public            postgres    false    220            �           2606    65774    type type_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.type
    ADD CONSTRAINT type_pkey PRIMARY KEY (id_type);
 8   ALTER TABLE ONLY public.type DROP CONSTRAINT type_pkey;
       public            postgres    false    224            �           2606    65724    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            �           1259    65740    fki_c    INDEX     ;   CREATE INDEX fki_c ON public.scheme USING btree (id_user);
    DROP INDEX public.fki_c;
       public            postgres    false    218            �           2606    65749    table scheme_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public."table"
    ADD CONSTRAINT scheme_fkey FOREIGN KEY (id_scheme) REFERENCES public.scheme(id_scheme);
 =   ALTER TABLE ONLY public."table" DROP CONSTRAINT scheme_fkey;
       public          postgres    false    220    218    3203            �           2606    65762    field table_fkey    FK CONSTRAINT     x   ALTER TABLE ONLY public.field
    ADD CONSTRAINT table_fkey FOREIGN KEY (id_table) REFERENCES public."table"(id_table);
 :   ALTER TABLE ONLY public.field DROP CONSTRAINT table_fkey;
       public          postgres    false    220    3205    222            �           2606    65775    field type_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.field
    ADD CONSTRAINT type_fkey FOREIGN KEY (type_field) REFERENCES public.type(id_type) NOT VALID;
 9   ALTER TABLE ONLY public.field DROP CONSTRAINT type_fkey;
       public          postgres    false    3209    222    224            �           2606    65735    scheme user_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.scheme
    ADD CONSTRAINT user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) NOT VALID;
 :   ALTER TABLE ONLY public.scheme DROP CONSTRAINT user_fkey;
       public          postgres    false    3200    216    218               >   x�3��/.I/J��2���L.�/�O+Q ��S��R���9}+A�&��E��9�\1z\\\ ��      $      x������ � �             x������ � �      "      x������ � �      &      x������ � �         )   x�3�L�H-J�uH�M���K���44207200����� ���     