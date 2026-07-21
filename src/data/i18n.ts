/**
 * Arabic strings for the home page's language switch, keyed by data-i18n.
 * Accurate Modern Standard Arabic translation of Mohammed's own content;
 * proper nouns (project/org names, username, email) stay in Latin.
 *
 * Mechanism copied from the reference: English text is captured from the DOM on
 * load; clicking a language swaps [data-i18n] text and re-aligns the columns.
 */
export const AR: Record<string, string> = {
  name: "محمد النويصر",
  bio: "أبني أنظمةً ذاتية التحكّم وأبحث في كيفية تفسير الذكاء الاصطناعي لقراراته. مهتمٌّ بالطائرات المسيّرة ذاتية التحكّم، والروبوتات، ومعالجة اللغات الطبيعية.",

  writings: "الكتابات",
  research: "الأبحاث",
  here: "هنا",

  r_grade: "الصف الحادي عشر، التخرّج المتوقّع 2027",
  o_school: "مدرسة ثانوية، الرياض",
  r_gifted: "طالب موهوب (اختبار موهبة MMCAT)",
  o_mawhiba: "موهبة",
  r_founder: "مؤسِّس",
  r_frl: "مؤسِّس وقائد بحثي",
  r_cto: "شريك مؤسِّس ومدير تقني",
  r_aix: "أبحاث في تفسير الذكاء الاصطناعي",

  langLabel: "اللغات التي أتحدّثها:",
};
