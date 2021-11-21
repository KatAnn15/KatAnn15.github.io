import * as React from "react";
import SimilarItems from "@scriptsMy/Main/MoviePageIndividual/SimilarItems/SimilarItems";
import { getBy } from "@test-utils";

test("render similar items", async () => {
  const similars = await getBy(
    "test_similarItems",
    <SimilarItems id="580489" />
  );
});
