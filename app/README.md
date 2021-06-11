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
| DELETE | api/v1/Goal/:GoalId/users/:userid |ユーザの削除|
| DELETE | api/v1/Goal/:GoalId/owners/:userid |ownersの削除|



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



DB設計
User
| 型 | カラム |詳細
----|----|----
| user_id | integer |ユーザid primay|
| screen_name | string |primary 固有の名前|
| name | string |名前|

Goal
| 型 | カラム |詳細
----|----|----
| goal_id | integer |goalid primay|
| name | string |目標の名前|
| period | date |期日|
| current | text |現状|
| gap | text |現状とのギャップ|
| unit | string |単位|


Goal_Log
| 型 | カラム |詳細
----|----|----
| goal_id | int |goalid primay|
| date | date |実行日|
| log | int |結果|

Goal_User
| 型 | カラム |詳細
----|----|----
| user_id | integer |ユーザid primay foreign|
| goal_id | hash |primary foreign|


Mission
| 型 | カラム |詳細
----|----|----
| mission_id | hash |missionid primay|
| goal_id | hash | foreign|
| name | text |課題名|
| impact | int |インパクト|
| easy | int |手軽さ|
| time | int |時間|
| do | bool |実行するか|

Solution
| 型 | カラム |詳細
----|----|----
| solution_id | hash |solution_id primay|
| mission_id | hash | foreign|
| name | text |解決策名|
| impact | int |インパクト|
| easy | int |手軽さ|
| time | int |時間|
| do | bool |実行するか|

Solution_Log
| 型 | カラム |詳細
----|----|----
| solution_id | hash |solution_id primay foreign|
| date | date | primary|

Solution_Frequency
| 型 | カラム |詳細
----|----|----
| solution_id | hash |solution_id primay foreign|
| day | int | primary (1~7)(曜日）|
