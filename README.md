# PDCA_app


API設計
GOAL
| METHOD | PATH |詳細
----|----|----
| POST | api/v1/Goal |新規Goal登録 |
| GET | api/v1/Goal |登録した全Goal取得|
| DELETE | api/v1/Goal/:GoalId |Goalの削除|
| POST | api/v1/Goal/:GoalId |Goalの編集|
| GET | api/v1/Goal/:GoalId/users |ユーザの取得|
| GET | api/v1/Goal/:GoalId/owners |ownersの取得|
| POST | api/v1/Goal/:GoalId/users/:userid |ユーザの追加|
| POST | api/v1/Goal/:GoalId/owners/:userid |ownersの追加|



ajax
課題(Mission)
| METHOD | PATH |詳細
----|----|----
| POST | api/v1/Goal/:GoalId/Mission |新規Mission登録 |
| GET | api/v1/Goal/:GoalId/Mission |登録した全Goal取得|
| DELETE | api/v1/Goal/:GoalId/Mission/:MissionId |Goalの削除|
| POST | api/v1/Goal/:GoalId/Mission/:MissionId |Goalの編集|


Solution

| METHOD | PATH |詳細
----|----|----
| POST | api/v1/Goal/:GoalId/Mission/:MissionId |新規solution登録 |
| GET | api/v1/Goal/:GoalId/Mission/:MissionId |登録した全solution取得|
| DELETE | api/v1/Goal/:GoalId/Mission/:MissionId/Solution/:SolutionId |Solutionの削除|
| POST | api/v1/Goal/:GoalId/Mission/:MissionId/Solution/:SolutionId |Solutionの編集|
| GET | api/v1/Goal/:GoalId/Mission/:MissionId/Solution/:SolutionId/log |logの取得|
| GET | api/v1/Goal/:GoalId/Mission/:MissionId/Solution/:SolutionId/frequency |頻度の取得|
| POST | api/v1/Goal/:GoalId/Mission/:MissionId/Solution/:SolutionId/frequency |頻度の編集|
| POST | api/v1/Goal/:GoalId/Mission/:MissionId/Solution/:SolutionId/done |Solutionの実行有無|



