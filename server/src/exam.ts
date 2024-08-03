import { ref } from "joi"
import { loadavg } from "os"

Coursework: 60%
Unseen Exam: 40%

Basics & overview:
- Subquery (examples)
- Indexing (Example, importance)
- Views (example, advantages)
- Trigger (example, advantages, use cases)
- Functions/Procedures (example, advantages, use cases)

Data warehouse 
- definition
// what is data warehouse?
//  data warehouse is a subject oriented, integrated, time variant, non volatile collection of data that is used for decision making for different business processes.
//  it is a giant repository of data.
//  it is a database that is used for decision making.
- architectures
//  talking about the architectures of data warehous, there are mainly 3 architectures
// 1. enterprise data warehouse
// 2. data mart
// 3. virtual data warehouse
//  so lets talk about enterprise data warehouse
//  enterprise data warehouse is a centralized data warehouse that is used for decision making for the entire organization.
//  it is also called as a top down approach.
//  it is also called as a corporate information factory.
//  it is easy to maintain.
//  so lets talk about data mart
//  data mart is a subset of the data warehouse.
//  it is a smaller version of the data warehouse.
//  it is a departmental data warehouse.
//  it is a collection of data that is used for decision making for a particular department.
//  it is a single subject oriented data warehouse.
//  it is a single departmental data warehouse.
//  eg: sales data mart, marketing data mart, finance data mart, hr data mart, etc
//  so lets talk about virtual data warehouse
//  virtual data warehouse is a combination of enterprise data warehouse and data mart.
//  it is a combination of top down approach and bottom up approach.
//  it is a combination of centralized and decentralized data warehouse.
//  it is a combination of enterprise data warehouse and data mart.
//  it is a combination of enterprise data warehouse and departmental data warehouse.
//  it is a combination of enterprise data warehouse and data mart.


- importance/need
// why do we need data warehouse?
//  we need data warehouse because it is a database that is used for decision making for different business processes.
//  it is a database that is used for decision making for different business processes.
-logging and auditing, and monitoring as it has a built in feature for that
- centralized repository of data
- integrated data
- single version of truth
- data quality and consistency

- OLAP, OLTP
// so lets have a look between oltp and olap
// oltp is online transaction processing and olap is online analytical processing.
// defining oltp, it is a database that is used for daily transactional purposes for different business processes.
// where as olap is an online data retrieval system that is used for decision making for different business processes.
//  if i talk about the differences between oltp and olap, there are mainly 4 differences
// 1. oltp is a database that is used for daily transactional purposes where as olap is a database that is used for decision making.
// 2. the second difference is oltp focuses on insert, delete, update and select operations where as olap focuses on select operations.
// processing time differences oltp => less, olap => more
// data storage differences oltp => less, olap => more
// data structure differences oltp => structured, while olap => structured, semi structured, unstructured
//  data in oltp is stored in 3rd normal form where as data in olap is stored in star, snowflake, hybrid schema
// queries in oltp are simple where as queries in olap are complex.
- instead of doing OLAP in database why should we have separate warehouse
// so lets talk about why should we have a separate data warehouse instead of doing olap in database
// the first reason is performance; having a separate data warehouse is faster than doing olap in database, in database we have to do olap on the operational databse which is not designed for olap, it is designed for oltp
// the second reason is cost having said that having a separate data warehouse is cheaper than doing olap in database, in database we have to do olap on the operational databse which is not designed for olap, it is designed for oltp
// the third reason is data loss, in database the data is lost whenever new transaction is done.
// security
// historical analysis
// scalability because it is easy to upscale
// types of data; database is designed for structured data where as data warehouse is designed for structured, semi structured and unstructured data
// data transformatio and integration; 
// query optimization: data warehouse uses techniques like indexing, partitioning, etc to optimize the queries where as database uses techniques like indexing, partitioning, etc to optimize the queries
// warehouse supports for advanced analytics: data warehouse supports for advanced analytics like data mining, machine learning, etc where as database does not support for advanced analytics like data mining, machine learning, etc
// 
- structures: Bill Inmon (3NF), Ralf Kimball (star, snowflake, hybrid)
// so lets talk about the structures of data warehouse
//  there are mainly 2 structures of data warehouse
// 1. bill inmon
// 2. ralf kimball
// 3. hybrid
//  so lets talk about bill inmon
// bill inmon is also called as a father of the data warehouse because he is the one who introduced the concept ot
// data warehouse.
// so bill inmon says that data warehouse should be a 3rd normal form.
// so lets talk about ralf kimball
// ralf kimball says that data warehouse should be a star schema or snowflake schema.
// so lets talk about hybrid
// hybrid is a combination of bill inmon and ralf kimball.

// taking more on bill inmon
// the datahouse is the extension of the operational database where we extract the data from the operational database
// and load it in the data warehouse.
// it is also called as a top down approach.
// it is also called as a corporate information factory.
// it is easy to maintain.
// elements of a bill inmon model
// - enterprise data warehouse
// - data mart
// - subject oriented
// - integrated

// taking more on ralf kimball
// ralf kimball approach is a bottom up approach where the data warehouse is built from the scratch as per the business requirements.
// it is also called as a dimensional modeling.
// it is not that easy to maintain because it is built from the scratch.
// one must not have to worry about the data loss because the data is extracted from the operational database and loaded in the data warehouse.
// the architecture is 
// project planning => business requirements gathering => data requirements gathering => data modeling => data extraction => data transformation => data loading => data presentation => data maintenance
// in this model ETL is in the process ifself where it is built in the process itself.
// key word is simplicity
// it is a popular techiniqe for data warehousing because it address two important requirements:
// - it provides a consistent view of the business
// - it provides high performance for large data volumes

// elements of a dimensional model
// - fact table
// - dimension table
// - attributes
// - granularity
- example use cases of identifying & implementing facts table (measure), dimension tables & attributes to make schema (star/snowflake/galaxy) 
// now lets talk about the example use cases of identifying and implementing facts table, dimension tables and attributes to make a schema
// lets take an example of a retail store
// so the facts table would be the sales table because facts table is the table that contains the measures or the metrics
// the dimension tables would be the product table, the customer table, the store table, the time table
// dimension holds the data that is used to analyze the facts
// because dimension tables are the tables that contains the attributes
// it is the context of the analysis it is the who, what, where, when, why, how of the analysis
// attributes are the columns of the dimension tables
// attributes are the columns of the facts table eg: sales amount, sales quantity, sales discount, sales tax, etc
// granularity is the level of detail of the data
// eg: daily, weekly, monthly, quarterly, yearly, etc

- Data marts:
// what is data mart?
// data mart is a subset of the data warehouse.
// it is a smaller version of the data warehouse.
// it is a departmental data warehouse.
// it is a collection of data that is used for decision making for a particular department.
// it is a single subject oriented data warehouse.
// it is a single departmental data warehouse.
// eg: sales data mart, marketing data mart, finance data mart, hr data mart, etc

// implementing star schema
// so lets talk about the implementation of star schema
// so lets take an example of a retail store
// from above example we have the facts table and the dimension tables
// the structure of the star schema is
// - facts table
// - dimension tables
// - attributes
// - granularity

-star schema:
// what is star schema?
// it is where fact table is connected to the dimension tables
// in our example in the middle sales fact surrounded by the dimension tables like product dimension, customer dimension, store dimension, time dimension
// simple schema design for fact table is:
// - one fact table

- snowflake schema:
// what is snowflake schema?
// it is where the dimension tables are connected to the other dimension tables
//  but here the dimension tables are normalized
// it is easier to load in the snowflake schema than the star schema because the dimension tables are normalized
// but it is difficult to query in the snowflake schema than the star schema because the dimension tables are normalized
// in future if we want to add more dimension tables then it is easier to add in the snowflake schema than the star schema because the dimension tables are normalized

- hybrid schema:
// what is hybrid schema?
// it is a combination of star schema and snowflake schema
// it is where one or more dimension tables are connected to the other dimension tables and one or more dimension tables are connected to the fact table
// it is easier to load in the hybrid schema than the star schema because the dimension tables are normalized

ETL
- What is ETL ?
The process of populating the data warehouse. 
Mainly, the main purpose is to get the data from external resources and have it loaded in the datawarehouse

- Major steps in ETL process (architecture).
1. Extract from the external resources
2. Load in the staging area
3. Transform and cleaning
4. Load in the data warehouse
 
- Implementations (cloud vs in-premise comparision)
Cloud =>
Pay as you go
No managed service
Easy to upscale and scalability
// other advantages could be 
// - no need to maintain hardware
// - no need to maintain software

on premise:
// advantages could be
more control over the data
more control over the hardware
more control over the software
// other advantages could be
// - no need to worry about security
secure and safe data
// - no need to worry about privacy
privacy of data
// - no need to worry about data leakage


- data transformation
// inside data transformation
can have issues while extracting data from external resources so need to clean the data and transform it to make it ready for loading in the data warehouse
not only that but 
// outside data transformation
// - data cleaning
// - data validation
// - data profiling
// - data enrichment
// - data aggregation
// - data summarization
// - data consolidation
// - data integration
// - data auditing
// - data reconciliation
// - data quality
// - data governance
// - data security

- Ways/types of data warehouse loads (Full/initial load & Incremental load)
Full/initial load:
// full load includes all the data from the external resources
// initial load is the first load of data from the external resources
incremental load is the load of the data that has been changed since the last load.

advantages of incremental load:
faster than full load
less time consuming
less resource intensive

advantages of full load:
// - no need to worry about data leakage
// - no need to worry about data loss
// - no need to worry about data security
// - no need to worry about data privacy
all the data is loaded so no need to worry about data loss
// - faster than full load
// - less resource intensive
// - less time consuming


- data cleaning:
check validity of the columns
check accuracy of the columns
remove duplicates
remove null values
checking referential integrity
checking business rules



- Data Lineage
// what is data lineage?
// data lineage is the process of tracking the data from the source to the destination
// why do we need data lineage?
// - to track the data
// - to track the data flow
// - to track the data transformation
// - to track the data quality

// how do we implement data lineage?

// - data lineage tools
like informatica, talend, etc
// - data lineage process
in the data lineage process we need to track the data from the source to the destination
// - data lineage architecture
in the architecture we need to have the data lineage tools and the data lineage process
- Advantages of ETL tools
what is etl tool?
//  etl tool is a software that is used to extract data from external resources, transform the data and load the data in the data warehouse.
//  it is a software that comprised of all the components of the etl process
//  some etl tools are
// - informatica,
//  ssis, nifi, talend, oracle data integrator, microsoft data factory, sas data management, ibm infosphere datastage, pentaho data integration, sap data services, etc
// so the advantages of etl tools are
// - easy to use
//  - easy to implement
//  flexibility because of the drag and drop feature
//  maintainability because it provides a repository to store the data
//  - scalability because it is easy to upscale
// -logging and auditing, and monitoring as it has a built in feature for that
//  now lets talk about the performance of the etl tools: it has a good performance because it is a software that is designed to do the etl process




Big Data:
- need of horizontal scalability
// why do we need horizontal scalability?
// horizontal sacalability is the process of adding more nodes to the existing cluster.
// with the increase in the data, the existing nodes may not be able to handle the data load so we need to add more nodes and go for the distributed computing.
// with horizontal scalability we are talking about the distributed computing, parallel computing, distributed storage, parallel storage, etc
// so the need of horizontal scalability is to handle the data load
// because at some point of time vertical scalability may not be able to handle the load and then we need to go for horizontal scalability
// it is easy to upscale
// it is easy to downscale
// it is cheaper than vertical scalability
- horizontal vs vertical scalability
// talking about the differences between horizontal scalability and vertical scalability, there are mainly 3 differences
// 1. horizontal scalability is the process of adding more nodes to the existing cluster where as vertical scalability is the process of adding more resources to the existing node
// 2. horizontal scalability is cheaper than vertical scalability
// 3. horizontal scalability is easier than vertical scalability
// about the fault tolerance, horizontal scalability is more fault tolerant than vertical scalability because in horizontal scalability we have multiple nodes and if one node fails then the other node will take over the process where as in vertical scalability we have only one node and if that node fails then the entire process fails.

- advantage and challanges of horizontal & vertical scalability
// advantages of horizontal scalability
// - easy to upscale
// - easy to downscale
// - cheaper than vertical scalability.
// - fault tolerance
// - high availability
// - high performance

// challenges of horizontal scalability
// - the challenges of horizontal scalability are the same as the challenges of distributed computing
// - the challenges of horizontal scalability are the same as the challenges of parallel computing
// - data consistency because the data is distributed across multiple nodes
// - data integrity because the data is distributed across multiple nodes

// advantages of vertical scalability
//  the advantages of vertical scalability are:
//  it is simple and easier to manage

// challenges of vertical scalability
//  the challenges of vertical scalability are:
//  it is expensive becase we need to add more resources to the existing node
//  it is difficult to upscale
// limited to the capacity of the hardware
// potential single point of failure
- need of big data
// why do we need big data?
// we need big data because it is a database that is used for decision making for different business processes.
// it is a database that is used for decision making for different business processes.
// analyze massive data

// need:
// organization collects data from various sources adn then to manage the storage and the processing of the data, we need big data.
- characteristics of Big Data (5 Vs)
// volume: with increase in high amount and of data. as per the research, 90% of the data in the world is generated in the past 2 years. so, we need big data to handle the high volume of data.
// velocity: data flow, data movement, eg: how a post in social media gets viral. so, we need big data to handle the high velocity of data. in memory analytics, real time analytics, etc
// variety: structured, semi structured, unstructured data. so we need it to handle the variety of data.
// value: data is an asset. so big data helps to extact the value from the data.
// veracity: data quality. in big data we have data quality tools to check the data quality. so we need big data to 

- challenges and opportunities in handling large datasets
// challenges:
// - data consistency in distributed environment.
// - data integrity in distributed environment.
// - data privacy and security. with increase in data, the data privacy and security is a big challenge.
// - data quality. with increase in data, the data quality is a big challenge.
// - data governance. with increase in data, the data governance is a big challenge.

// opportunities:
// - data analytics that means data mining, machine learning, big data analytics, etc
// - data visualization that means data visualization tools like tableau, power bi, qlikview, etc
// - predictive analytics that means predictive analytics tools like r, python, etc
// - data science that means data science tools like r, python, etc

- different roles of data professional
// data analyst: a person who analyzes the data and provides insights from the data.
// data scientist: data analyst + data engineer + machine learning engineer
// data engineer: a person who builds the data pipelines.
// data architect: a person who designs the data pipelines.
// data administrator: a person who manages the data pipelines.
- importance of big data in Data science
// why do we need big data in data science?
// we need big data in data science because it is a database that is used for decision making for different business processes.
// it is a database that is used for decision making for different business processes.
// analyze massive data

- applications of big data
// healthcare: to analyze the patient data from different sources and provide insights from the data.
// retail: to analyze the customer behavior and provide insights from the data.
// banking: to minimize the fraud detection, risk analysis, etc.
// social media marketing: to analyze the customer behavior and provide insights from the data.
// manufacturing: to analyze the trends and help in the decision making process.

NoSQL:
- structured, semi-structured, and unstructured data; (example or use-case of each)
- CAP theorem
- RDBMS follows CA and not P
- HBase follows CP and not A
- limitations of using a traditional relational database AND why we need NoSql 
- types/taxonomy of NoSQL databases
- structure & queries for MongoDb , HBase

Hadoop:
- Definition; Why we need hadoop?
- Core components of Hadoop 2 (MR, HDFS, YARN) and Hadoop 1 (MR, HDFS)
- Hadoop 1 vs Hadoop 2
- Working of HDFS (Illustrate image showing how big file is distributed)
- principles of MapReduce programming and demonstration of how it works with example (Eg: word count image example)
- Shortcomings of MapReduce? How Hive Solves These Shortcomings?
- Comparision of MapReduce, Pig, Hive
- Spark and it's different APIs
