import { useLanguage } from "../../i18n";
import { TERMS_OF_SERVICE_VERSION } from "./policyVersions";
import { LegalPageLayout } from "./LegalPageLayout";

export function TermsPage() {
  const { t } = useLanguage();
  const s = t.legal.terms;

  return (
    <LegalPageLayout title={s.pageTitle} version={TERMS_OF_SERVICE_VERSION}>
      <section>
        <h2 className="font-medium text-ink">{s.s1.heading}</h2>
        <p>
          {s.s1.before}{" "}
          <a className="text-brand underline" href="mailto:support@jinbocho.eu">
            support@jinbocho.eu
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="font-medium text-ink">{s.s2.heading}</h2>
        <p>{s.s2.body}</p>
      </section>

      <section>
        <h2 className="font-medium text-ink">{s.s3.heading}</h2>
        <p>{s.s3.body}</p>
      </section>

      <section>
        <h2 className="font-medium text-ink">{s.s4.heading}</h2>
        <p>{s.s4.body}</p>
      </section>

      <section>
        <h2 className="font-medium text-ink">{s.s5.heading}</h2>
        <p>{s.s5.body}</p>
      </section>

      <section>
        <h2 className="font-medium text-ink">{s.s6.heading}</h2>
        <p>{s.s6.body}</p>
      </section>

      <section>
        <h2 className="font-medium text-ink">{s.s7.heading}</h2>
        <p>{s.s7.body}</p>
      </section>

      <section>
        <h2 className="font-medium text-ink">{s.s8.heading}</h2>
        <p>{s.s8.body}</p>
      </section>
    </LegalPageLayout>
  );
}
