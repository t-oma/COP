import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import { parseIntSafe } from "~/shared/utils/utils";
import { useGameSettings } from "./settingsProvider";
import type { Difficulty } from "~/shared/types";

type Status = "pending" | "ok" | "redirect";

type UseSettingsGuardProps = { gameId?: number };
type UseSettingsGuardReturn = {
  status: Status;
  ready: boolean;
};

function useSettingsGuard({
  gameId,
}: Readonly<UseSettingsGuardProps>): UseSettingsGuardReturn {
  const [status, setStatus] = useState<Status>("pending");
  const [searchParams] = useSearchParams();
  const { gameId: ctxId, updateSettings } = useGameSettings();

  const url = useMemo(() => {
    const difficulty = searchParams.get("difficulty");
    const hintLength = searchParams.get("hintLength");

    return { difficulty, hintLength };
  }, [searchParams]);

  useEffect(() => {
    if (gameId == null) {
      setStatus("redirect"); // eslint-disable-line
      return;
    }

    if (ctxId != null && ctxId === gameId) {
      setStatus("ok"); // eslint-disable-line
      return;
    }

    const parsedHint = parseIntSafe(url.hintLength);

    if (url.difficulty && parsedHint !== null) {
      updateSettings(gameId, {
        difficulty: url.difficulty as Difficulty,
        hintLength: parsedHint,
        remember: false,
      });

      setStatus("ok"); // eslint-disable-line
      return;
    }

    setStatus("redirect"); // eslint-disable-line
  }, [gameId, ctxId, url.difficulty, url.hintLength, updateSettings]);

  return { status, ready: status === "ok" };
}

export { useSettingsGuard };
export type { Status, UseSettingsGuardProps, UseSettingsGuardReturn };
