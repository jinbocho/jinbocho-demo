import { Link } from "react-router-dom";
import { useLanguage } from "../i18n";
import { EmptyState } from "../components/feedback/EmptyState";
import { Button } from "../components/ui/Button";

export function NotFoundPage() {
  const { t } = useLanguage();
  return (
    <div className="grid min-h-dvh place-items-center px-4">
      <EmptyState
        title={t.common.pageNotFound}
        description={t.common.pageNotFoundDesc}
        action={
          <Link to="/">
            <Button>{t.common.goHome}</Button>
          </Link>
        }
      />
    </div>
  );
}
