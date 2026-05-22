import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";

actor {
  module JobCategory {
    public type Type = {
      #centralGovt;
      #stateGovt;
      #csc;
      #railway;
      #banking;
      #defence;
    };

    public func toText(category : Type) : Text {
      switch (category) {
        case (#centralGovt) { "Central Govt" };
        case (#stateGovt) { "State Govt" };
        case (#csc) { "CSC" };
        case (#railway) { "Railway" };
        case (#banking) { "Banking" };
        case (#defence) { "Defence" };
      };
    };
  };

  type Job = {
    id : Nat;
    title : Text;
    department : Text;
    category : JobCategory.Type;
    vacancies : Nat;
    lastDate : Text;
    qualification : Text;
    applyLink : Text;
    isActive : Bool;
    postedDate : Text;
  };

  type Alert = {
    id : Nat;
    title : Text;
    description : Text;
    date : Text;
    isActive : Bool;
  };

  let jobs = Map.empty<Nat, Job>();
  let alerts = Map.empty<Nat, Alert>();
  var nextJobId = 1;
  var nextAlertId = 1;
  let adminPassword = "admin123";

  public query ({ caller }) func getAllActiveJobs() : async [Job] {
    jobs.values().filter(func(job) { job.isActive }).toArray();
  };

  public query ({ caller }) func getJobsByCategory(category : JobCategory.Type) : async [Job] {
    jobs.values().filter(
      func(job) {
        job.isActive and (job.category == category);
      }
    ).toArray();
  };

  public query ({ caller }) func getAllActiveAlerts() : async [Alert] {
    alerts.values().filter(func(alert) { alert.isActive }).toArray();
  };

  public query ({ caller }) func getJobById(id : Nat) : async Job {
    switch (jobs.get(id)) {
      case (null) { Runtime.trap("Job not found") };
      case (?job) { job };
    };
  };

  public shared ({ caller }) func addJob(
    password : Text,
    title : Text,
    department : Text,
    category : JobCategory.Type,
    vacancies : Nat,
    lastDate : Text,
    qualification : Text,
    applyLink : Text,
    postedDate : Text,
  ) : async () {
    assertAdmin(password);
    let job : Job = {
      id = nextJobId;
      title;
      department;
      category;
      vacancies;
      lastDate;
      qualification;
      applyLink;
      isActive = true;
      postedDate;
    };
    jobs.add(nextJobId, job);
    nextJobId += 1;
  };

  public shared ({ caller }) func updateJob(
    password : Text,
    id : Nat,
    title : Text,
    department : Text,
    category : JobCategory.Type,
    vacancies : Nat,
    lastDate : Text,
    qualification : Text,
    applyLink : Text,
    isActive : Bool,
    postedDate : Text,
  ) : async () {
    assertAdmin(password);
    switch (jobs.get(id)) {
      case (null) { Runtime.trap("Job not found") };
      case (?_) {
        let updatedJob : Job = {
          id;
          title;
          department;
          category;
          vacancies;
          lastDate;
          qualification;
          applyLink;
          isActive;
          postedDate;
        };
        jobs.add(id, updatedJob);
      };
    };
  };

  public shared ({ caller }) func deleteJob(password : Text, id : Nat) : async () {
    assertAdmin(password);
    if (not jobs.containsKey(id)) {
      Runtime.trap("Job not found");
    };
    jobs.remove(id);
  };

  public shared ({ caller }) func addAlert(
    password : Text,
    title : Text,
    description : Text,
    date : Text,
  ) : async () {
    assertAdmin(password);
    let alert : Alert = {
      id = nextAlertId;
      title;
      description;
      date;
      isActive = true;
    };
    alerts.add(nextAlertId, alert);
    nextAlertId += 1;
  };

  public shared ({ caller }) func updateAlert(
    password : Text,
    id : Nat,
    title : Text,
    description : Text,
    date : Text,
    isActive : Bool,
  ) : async () {
    assertAdmin(password);
    switch (alerts.get(id)) {
      case (null) { Runtime.trap("Alert not found") };
      case (?_) {
        let updatedAlert : Alert = {
          id;
          title;
          description;
          date;
          isActive;
        };
        alerts.add(id, updatedAlert);
      };
    };
  };

  public shared ({ caller }) func deleteAlert(password : Text, id : Nat) : async () {
    assertAdmin(password);
    if (not alerts.containsKey(id)) {
      Runtime.trap("Alert not found");
    };
    alerts.remove(id);
  };

  func assertAdmin(password : Text) {
    if (password != adminPassword) {
      Runtime.trap("Unauthorized: Incorrect password");
    };
  };

  system func preupgrade() {
    jobs.clear();
    alerts.clear();
  };

  // Sample data
  public shared ({ caller }) func addSampleData(password : Text) : async () {
    assertAdmin(password);

    jobs.clear();
    alerts.clear();
    nextJobId := 1;
    nextAlertId := 1;

    // Add sample jobs
    await addJob(adminPassword, "Software Developer", "Ministry of IT", #centralGovt, 10, "2024-07-31", "B.Tech/MCA", "https://govjobs.icp0.io/apply/1", "2024-06-01");
    await addJob(adminPassword, "Junior Engineer", "Railways", #railway, 50, "2024-08-15", "Diploma/B.Tech", "https://govjobs.icp0.io/apply/2", "2024-06-05");
    await addJob(adminPassword, "Bank PO", "State Bank", #banking, 100, "2024-09-01", "Any Graduate", "https://govjobs.icp0.io/apply/3", "2024-06-10");
    await addJob(adminPassword, "Data Entry Operator", "CSC", #csc, 30, "2024-07-20", "12th Pass", "https://govjobs.icp0.io/apply/4", "2024-06-15");
    await addJob(adminPassword, "Police Sub-Inspector", "State Govt", #stateGovt, 20, "2024-08-30", "Any Graduate", "https://govjobs.icp0.io/apply/5", "2024-06-20");

    // Add sample alerts
    await addAlert(adminPassword, "Exam Date Extended", "The exam date for Junior Engineer has been extended.", "2024-06-25");
    await addAlert(adminPassword, "New Vacancies", "Fresh vacancies announced for government teachers.", "2024-06-28");
    await addAlert(adminPassword, "Document Verification", "Candidates shortlisted for document verification.", "2024-07-01");
  };
};
