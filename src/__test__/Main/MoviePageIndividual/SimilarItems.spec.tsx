import * as React from "react";
import SimilarItems from "@scriptsMy/Main/MoviePageIndividual/SimilarItems/SimilarItems";
import SimilarItem from "@scriptsMy/Main/MoviePageIndividual/SimilarItems/SimilarItem";
import { findBy, getBy } from "../../../test-actions";
import { waitFor } from "@testing-library/react";

test("render similar items", async () => {
  const similars = await findBy(
    "test_similarItems",
    <SimilarItems id="580489" />
  );
  waitFor(() => expect(similars.children.length).toBeGreaterThan(0));

  const oneSimilar = await findBy(
    "test_one-similar",
    <SimilarItem data={{ poster_path: "some path", original_title: "Title" }} />
  );
  waitFor(() => expect(oneSimilar.innerHTML).toContain("Title"));
});
