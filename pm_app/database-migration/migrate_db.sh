#! /bin/sh

export PATH=$PATH:/usr/local/jdk/bin/

# Database type. Valid options: ORACLE, MSSQL, POSTGRESQL
DEFAULT_DB_TYPE="POSTGRESQL"

DEFAULT_DB_NAME="db_name"

DEFAULT_DB_HOST_PORT="127.0.0.1:1433"
DEFAULT_DB_USER=""
DEFAULT_DB_USER_PWD=""

CONTEXTS="common,indexes"

ACTION="update"

echo "================================================================================================"
echo Migration tool for PRODUCTION db 
echo use -help for more information about migration tool

if [ "$1" == "-help" ]; then
  echo ""
  echo "Run format:"
  echo "./liquibase.sh <host_and_port> <database_name> <username> [password] <db_type>"
  echo "Parameters:"
  echo "host_and_port - host and port for connecting (for example: localhost:5432 )"
  echo "database_name - database name"
  echo "usernmae      - username"
  echo "password      - password (if the password is empty - do not fill)"
  echo "db_type       - database type (valid options: ORACLE, MSSQL, POSTGRESQL)"
  echo ""
  echo "NOTICE: if you are running tool without params then values by default is: $DEFAULT_DB_HOST_PORT $DEFAULT_DB_NAME $DEFAULT_DB_USER $DEFAULT_DB_USER_PWD $DB_TYPE"
  echo "----------------------------------------------------------------------------------------------------------"
  echo ""
  exit 1
fi


# db type
if [ "$5" == "" ]; then
  DB_TYPE=$DEFAULT_DB_TYPE
else
  DB_TYPE=$5
fi

# password
if [ "$4" == "" ]; then
  DB_USER_PWD=$DEFAULT_DB_USER_PWD
else
  DB_USER_PWD=$4  
fi

# user name
if [ "$3" == "" ]; then
  DB_USER=$DEFAULT_DB_USER
else
  DB_USER=$3  
fi

# DB name
if [ "$2" == "" ]; then
  DB_NAME=$DEFAULT_DB_NAME
else
  DB_NAME=$2  
fi

# host and port
if [ "$1" == "" ]; then
  DB_HOST_PORT=$DEFAULT_DB_HOST_PORT
else
  DB_HOST_PORT=$1  
fi


cd bin


if [ "$DB_TYPE" == "ORACLE" ]; then
  DB_DRIVER="oracle.jdbc.driver.OracleDriver"
  DB_URL="jdbc:oracle:thin:@$DB_HOST_PORT:$DB_NAME"
else
  if [ "$DB_TYPE" == "MSSQL" ]; then
    DB_DRIVER="com.microsoft.sqlserver.jdbc.SQLServerDriver"
    DB_URL="jdbc:sqlserver://$DB_HOST_PORT;databaseName=$DB_NAME"
    else
    if [ "$DB_TYPE" == "POSTGRESQL" ]; then
      DB_DRIVER="org.postgresql.Driver"
      DB_URL="jdbc:postgresql://$DB_HOST_PORT/$DB_NAME"
    fi
  fi
fi

echo "Liquibase args --driver=$DB_DRIVER --changeLogFile=../changelog.xml --logLevel=INFO --contexts=$CONTEXTS --url=$DB_URL --username=$DB_USER --password=$DB_USER_PWD $ACTION"

echo "Please click Enter to start liquibase action. Ctrl+C to cancel"

read

./liquibase.sh --driver=$DB_DRIVER --changeLogFile=../main.xml --logLevel=INFO --contexts=$CONTEXTS --url=$DB_URL --username=$DB_USER --password=$DB_USER_PWD $ACTION

