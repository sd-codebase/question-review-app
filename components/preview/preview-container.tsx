import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { supabase } from "../../lib/supabase";
import Answer from "./answer";
import IntegerAnswer from "./integer-answer";
import Options from "./options";
import Question from "./question";
import Solutions from "./solutions";

export default function PreviewContainer() {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("error");
  const [question, setQuestion] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    fetchQuestionForPreview();
  }, []);

  const fetchQuestionForPreview = async () => {
    setQuestion(null);
    setStatus("loading");

    try {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("review_in_app", true)
        .limit(1)
        .single();

      if (error) {
        setStatus("error");
        setQuestion(null);
        return;
      }

      const que = {
        ...data,
        srNo: data.sr_no,
        hasIntegerAnswer: data.has_integer_answer,
        isMarkedForReview: data.is_marked_for_review,
        reviewInApp: data.review_in_app,
        isActive: data.is_active,
        topicId: data.topic_id,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
      setQuestion(que);
      setStatus("ready");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const markReviewDone = async () => {
    if (!question?.id) {
      alert("No question");
      return;
    }

    try {
      const { error } = await supabase
        .from("questions")
        .update({ verified_in_app: true, review_in_app: false })
        .eq("id", question.id);

      if (error) {
        alert(`Error: Q ${question?.srNo} could not be marked as review done!`);
        return;
      }

      alert(`Success : Q ${question?.srNo} Marked as review done!`);
      fetchQuestionForPreview(); // Fetch next question after marking current as done
    } catch (error) {
      console.error(error);
      alert(`Error: Q ${question?.srNo} could not be marked as review done!`);
    }
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      {status === "error" || !question ? (
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            padding: 8,
            justifyContent: "space-between",
          }}
        >
          <Button title="Reload" onPress={fetchQuestionForPreview} />
          <Button
            title="Sign Out"
            onPress={() => supabase.auth.signOut()}
            icon={{
              name: "logout",
              type: "material",
              size: 20,
              color: "white",
            }}
            iconPosition="left"
          />
        </View>
      ) : (
        <>
          <View style={{ flexDirection: "row", gap: 8, padding: 8 }}>
            <Button title="Reload" onPress={fetchQuestionForPreview} />
          </View>
          <ScrollView>
            <View style={styles.mathContainer}>
              <Question {...question} />
              <Options
                options={question.options}
                show={!question?.hasIntegerAnswer && question.options}
              />
              <IntegerAnswer show={question?.hasIntegerAnswer} />
              <Answer answer={question.answer} show />
              <Solutions solutions={question.solutions} />
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              padding: 8,
              justifyContent: "space-between",
            }}
          >
            <Button title="Mark as done" onPress={markReviewDone} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mathContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 16,
    padding: 8,
  },
});
