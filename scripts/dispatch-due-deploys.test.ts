import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  calendarDaysBefore,
  isPostDue,
  shouldDispatch,
  zurichCalendarDay,
} from "./dispatch-due-deploys.ts";

describe("calendar lookback", () => {
  it("steps back whole calendar days, including across a month boundary", () => {
    assert.equal(calendarDaysBefore("2026-10-02", 1), "2026-10-01");
    assert.equal(calendarDaysBefore("2026-10-02", 7), "2026-09-25");
    assert.equal(calendarDaysBefore("2026-03-01", 1), "2026-02-28");
  });
});

describe("Europe/Zurich calendar day", () => {
  it("rolls to the next day after 22:00 UTC in summer (CEST, UTC+2)", () => {
    assert.equal(zurichCalendarDay(new Date("2026-09-29T21:30:00.000Z")), "2026-09-29");
    assert.equal(zurichCalendarDay(new Date("2026-09-29T22:30:00.000Z")), "2026-09-30");
  });

  it("rolls to the next day after 23:00 UTC in winter (CET, UTC+1)", () => {
    assert.equal(zurichCalendarDay(new Date("2026-01-15T22:30:00.000Z")), "2026-01-15");
    assert.equal(zurichCalendarDay(new Date("2026-01-15T23:30:00.000Z")), "2026-01-16");
  });

  it("compares those days as YYYY-MM-DD strings", () => {
    const lastRunDay = zurichCalendarDay(new Date("2026-09-29T21:30:00.000Z"));
    const today = zurichCalendarDay(new Date("2026-09-29T22:30:00.000Z"));
    assert.equal(lastRunDay < today, true);
    assert.equal(`${lastRunDay} < ${today}`, "2026-09-29 < 2026-09-30");
    assert.equal(isPostDue({ draft: false, pubDate: today }, today, lastRunDay), true);
    assert.equal(isPostDue({ draft: false, pubDate: lastRunDay }, today, lastRunDay), false);
  });
});

describe("due since last successful deploy", () => {
  const today = "2026-09-29";

  it("is due when pubDate is after the run start day and on or before today", () => {
    assert.equal(
      isPostDue({ draft: false, pubDate: "2026-09-29" }, today, "2026-09-27"),
      true,
    );
    assert.equal(
      isPostDue({ draft: false, pubDate: "2026-09-28" }, today, "2026-09-27"),
      true,
    );
  });

  it("is not due on the same Zurich day the last successful run started", () => {
    assert.equal(
      isPostDue({ draft: false, pubDate: "2026-09-27" }, today, "2026-09-27"),
      false,
    );
  });

  it("is not due when pubDate is still in the future", () => {
    assert.equal(
      isPostDue({ draft: false, pubDate: "2026-10-06" }, today, "2026-09-27"),
      false,
    );
  });

  it("is not due when the post is a draft", () => {
    assert.equal(
      isPostDue({ draft: true, pubDate: "2026-09-29" }, today, "2026-09-27"),
      false,
    );
  });

  it("dispatches once when the workflow has never succeeded and a post is already due", () => {
    assert.equal(
      shouldDispatch(
        [
          { draft: false, pubDate: "2026-09-01" },
          { draft: false, pubDate: "2026-10-06" },
          { draft: true, pubDate: "2026-09-15" },
        ],
        today,
        null,
      ),
      true,
    );
  });

  it("does not dispatch when nothing is already due and the workflow has never succeeded", () => {
    assert.equal(
      shouldDispatch(
        [
          { draft: false, pubDate: "2026-10-06" },
          { draft: true, pubDate: "2026-09-01" },
          { draft: false, pubDate: null },
        ],
        today,
        null,
      ),
      false,
    );
  });

  it("dispatches a brand when only one post is newer than the last run and due", () => {
    assert.equal(
      shouldDispatch(
        [
          { draft: false, pubDate: "2026-09-01" },
          { draft: false, pubDate: "2026-09-29" },
          { draft: true, pubDate: "2026-09-29" },
        ],
        today,
        "2026-09-20",
      ),
      true,
    );
  });

  it("does not dispatch when every non-draft post was already covered by the last run day", () => {
    assert.equal(
      shouldDispatch(
        [
          { draft: false, pubDate: "2026-09-01" },
          { draft: false, pubDate: "2026-09-20" },
        ],
        today,
        "2026-09-20",
      ),
      false,
    );
  });
});
