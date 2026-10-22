/**
 * The 10 content clusters of the doctor-written Health Library series.
 * Each cluster has one pillar article and a set of support articles; the
 * blog index groups posts by cluster (pillar first) and post breadcrumbs
 * include the cluster as the middle crumb.
 */
export interface BlogCluster {
  n: number;
  name: string;
  /** slug of the pillar article that opens the cluster */
  pillar: string;
}

export const BLOG_CLUSTERS: BlogCluster[] = [
  { n: 1, name: "Type 2 Diabetes", pillar: "type-2-diabetes-symptoms-diagnosis-management" },
  { n: 2, name: "Prediabetes", pillar: "prediabetes-hba1c-blood-sugar-symptoms-prevention" },
  { n: 3, name: "Diabetes Diet for Indians", pillar: "diabetes-diet-for-indians" },
  { n: 4, name: "GLP-1 in India", pillar: "glp-1-diabetes-weight-loss-india-price-results-side-effects" },
  { n: 5, name: "Technology and Evolution of GLP-1", pillar: "technology-evolution-glp-1-drugs" },
  { n: 6, name: "Diabesity", pillar: "diabetes-and-obesity-diabesity-guide" },
  { n: 7, name: "GLP-1 Medicines", pillar: "glp-1-medicines-diabetes-weight-loss" },
  { n: 8, name: "Continuous Glucose Monitoring", pillar: "continuous-glucose-monitoring-cgm-guide" },
  { n: 9, name: "Gestational Diabetes", pillar: "gestational-diabetes-gdm-testing-blood-sugar-targets-diet-insulin-postpartum-care" },
  { n: 10, name: "Metabolic Syndrome and Cardiometabolic Health", pillar: "metabolic-syndrome-fatty-liver-diabetes-heart-kidney-connection" },
];

export const clusterFor = (n: number | string | undefined): BlogCluster | undefined =>
  BLOG_CLUSTERS.find((c) => c.n === Number(n));
