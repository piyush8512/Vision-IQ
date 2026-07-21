-- =====================================
-- Doctor Exam Records
-- =====================================


CREATE TABLE public.exam_records (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id uuid NOT NULL
        REFERENCES public.appointments(id)
        ON DELETE CASCADE,
    doctor_id uuid NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE CASCADE,
    diagnosis text,
    clinical_findings jsonb NOT NULL DEFAULT '[]'::jsonb,
    recommendations jsonb NOT NULL DEFAULT '[]'::jsonb,
    prescription_changes jsonb NOT NULL DEFAULT '[]'::jsonb,
    vision_measurements jsonb NOT NULL DEFAULT '{}'::jsonb,
    follow_up text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT exam_record_per_appointment UNIQUE (appointment_id)
);


-- =====================================
-- Indexes
-- =====================================

CREATE INDEX idx_exam_records_appointment
ON public.exam_records(appointment_id);

CREATE INDEX idx_exam_records_doctor
ON public.exam_records(doctor_id);


-- =====================================
-- EXAM RECORDS updated_at Trigger
-- =====================================

CREATE TRIGGER trg_exam_records_updated_at
BEFORE UPDATE ON public.exam_records
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================
-- RLS
-- =====================================

ALTER TABLE public.exam_records
ENABLE ROW LEVEL SECURITY;

-- =====================================
-- dOCTOR POLICY
-- =====================================



CREATE POLICY "Doctors manage own exam records"
ON public.exam_records
FOR ALL
USING (
    auth.uid() = doctor_id
)
WITH CHECK (
    auth.uid() = doctor_id
);



-- =====================================
-- PATIENT POLICY
-- =====================================

CREATE POLICY "Patients can view own exam records"
ON public.exam_records
FOR SELECT
USING (
    EXISTS (
        SELECT 1
        FROM public.appointments
        WHERE appointments.id = exam_records.appointment_id
        AND appointments.user_id = auth.uid()
    )
);