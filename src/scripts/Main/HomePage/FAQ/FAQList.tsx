import React, { useCallback, useState, useEffect } from "react";
import { getFirestoreData } from "src/scripts/Global/Firebase/firebase_actions";
import FAQItem from "./FAQItem/FAQItem";
import "./FAQList.scss";

interface FAQItemsTypes {
  faqItems: (JSX.Element | null)[];
  setFAQItems: React.Dispatch<React.SetStateAction<(JSX.Element | null)[]>>;
}

const FAQList: React.FC = () => {
  const [faqItems, setFAQItems] = useState<FAQItemsTypes["faqItems"]>([null]);

  const fetchFAQ = useCallback(async () => {
    const data = await getFirestoreData("FAQ");
    let items = data
      .sort((a, b) => a.sort - b.sort)
      .map((item) => {
        const { question, answer, sort } = item;
        return <FAQItem question={question} answer={answer} key={sort} />;
      });
    setFAQItems(items);
  }, []);
  useEffect(() => {
    fetchFAQ();
  }, [fetchFAQ]);
  return (
    <div className="faq-list_wrapper">
      <div className="faq-list_content-container">
        <h2 className="faq_title">Frequently Asked Questions</h2>
        <div className="faq-items_wrapper">{faqItems}</div>
      </div>
    </div>
  );
};

export default FAQList;
