-- =====================================================
-- Family History Table
-- =====================================================

-- =====================================
-- Create Table
-- =====================================

CREATE TABLE public.family_history (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE CASCADE,
    relation text NOT NULL,
    conditions text[] NOT NULL DEFAULT '{}',
    notes text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- =====================================
-- Relation Validation
-- =====================================

ALTER TABLE public.family_history
ADD CONSTRAINT family_history_relation_check
CHECK (
    relation IN (
        'Mother',
        'Father',
        'Brother',
        'Sister',
        'Grandmother',
        'Grandfather',
        'Uncle',
        'Aunt',
        'Son',
        'Daughter',
        'Other'
    )
);

-- =====================================
-- Eye Conditions Validation
-- =====================================

ALTER TABLE public.family_history
ADD CONSTRAINT family_history_conditions_check
CHECK (
    conditions <@ ARRAY[
        'Glaucoma',
        'Cataracts',
        'Macular Degeneration',
        'Diabetic Retinopathy',
        'Myopia',
        'Hyperopia',
        'Astigmatism',
        'Color Blindness',
        'Retinal Detachment',
        'Lazy Eye',
        'Other'
    ]::text[]
);

-- =====================================
-- At Least One Condition Required
-- =====================================

ALTER TABLE public.family_history
ADD CONSTRAINT family_history_conditions_not_empty
CHECK (cardinality(conditions) > 0);

-- =====================================
-- Indexes
-- =====================================

CREATE INDEX idx_family_history_user_id
ON public.family_history(user_id);

-- CREATE INDEX idx_family_history_relation
-- ON public.family_history(relation);

-- =====================================
-- Automatically Update updated_at
-- =====================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_family_history_updated_at
BEFORE UPDATE ON public.family_history
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================
-- Row Level Security
-- =====================================

ALTER TABLE public.family_history
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own family history"
ON public.family_history
FOR ALL
USING (
    auth.uid() = user_id
)
WITH CHECK (
    auth.uid() = user_id
);