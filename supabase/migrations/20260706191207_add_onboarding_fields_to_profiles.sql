-- =================================================
-- Add onboarding fields to profiles table
-- =================================================


-- -------------------------------
-- Add new columns
-- -------------------------------

ALTER TABLE public.profiles

ADD COLUMN date_of_birth date,

ADD COLUMN gender text,

ADD COLUMN vision_aids text,

ADD COLUMN last_exam_date date,

ADD COLUMN eye_care_goals text[] DEFAULT '{}',

ADD COLUMN updated_at timestamptz DEFAULT now();



-- -------------------------------
-- Gender validation
-- -------------------------------

ALTER TABLE public.profiles
ADD CONSTRAINT profiles_gender_check
CHECK (
    gender IS NULL
    OR
    gender IN (
        'Female',
        'Male',
        'Non-binary',
        'Prefer not to say'
    )
);



-- -------------------------------
-- Vision aids validation
-- -------------------------------

ALTER TABLE public.profiles
ADD CONSTRAINT profiles_vision_aids_check
CHECK (
    vision_aids IS NULL
    OR
    vision_aids IN (
        'Glasses',
        'Contacts',
        'None'
    )
);



-- -------------------------------
-- Eye care goals validation
-- -------------------------------

ALTER TABLE public.profiles
ADD CONSTRAINT profiles_eye_care_goals_check
CHECK (

eye_care_goals <@ ARRAY[

    'Reduce Eye Strain',

    'Manage Screen Time',

    'Improve Sleep Quality',

    'Monitor Vision Health'

]::text[]

);



-- -------------------------------
-- updated_at auto update function
-- -------------------------------


CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
AS $$

BEGIN

    NEW.updated_at = now();

    RETURN NEW;

END;

$$;



-- -------------------------------
-- updated_at trigger
-- -------------------------------


CREATE TRIGGER update_profiles_updated_at

BEFORE UPDATE

ON public.profiles

FOR EACH ROW

EXECUTE FUNCTION public.update_updated_at_column();