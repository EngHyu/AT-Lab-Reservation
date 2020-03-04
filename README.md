# 사용자 앱 디렉토리 구조

AT-Lab-Reservation-System은 두 개의 프로젝트로 나뉘어 있습니다.

사용자 앱은 외부 접속을 막기 위해 electron으로 패키징 하였고, 알맹이는 react를 사용하였습니다.

## 프로젝트 시작하기

1. 프로젝트 폴더에 들어가 `yarn` 명령어를 통해 개발에 사용된 node 모듈을 내려받습니다.
2. `yarn dev` 명령어를 통해 실행할 수 있습니다.
3. `yarn dist` 명령어를 통해 실행 파일을 생성할 수 있습니다. 실행 파일은 dist 폴더 아래에 위치합니다.
```
Uncaught Error: Cannot find module '~/project/node_modules/sqlite3/lib/binding/electron-v5.0-darwin-x64/node_sqlite3.node'
```
4. 위와 같은 에러는 `yarn rebuild` 명령어를 통해 해결할 수 있습니다.

5. `yarn dist` 과정에서 코드 난독화가 진행됩니다. 때문에 클래시 이름 등을 변수로 사용하시면 배포용 앱에서 오류가 발생할 가능성이 높습니다.

## 프로젝트 구조

설정 파일 같은 건 빼고, 코드와 관련된 것만 적어봤습니다.

```
src/
ㄴ common/
     ㄴ components/
     ㄴ css/
     ㄴ db/index.js

ㄴ main/index.js
ㄴ renderer/
     ㄴ App.global.css
     ㄴ App.js
     ㄴ index.js

ㄴ static/
     ㄴ strings/
     ㄴ settings.json

css.webpack.addition.js
package.json
```

- `yarn dev` 하시면 `src/main/index.js`를 통해 진입, `src/renderer/index.js`를 불러옵니다.

- `src/renderer/index.js`는 각종 React component를 포함한 `<App />`을 도큐먼트에 붙입니다.

- React component는 `src/common/components` 아래에 있으며, `index.js`를 통해 export 되고 있습니다. 이를 통해 한 번에 import 할 수 있으나, 새로운 파일 및 클래스를 생성할 때마다 `index.js`에 추가해주셔야 합니다. 아래와 같이 사용 가능합니다.

```
import { Title } from 'common/components'
```

- bootstrap 불러오기 및 전체적인 수정은`App.global.css`에서 담당하고 있으며, `css.webpack.addition.js`는 css-module 적용을 돕는 파일입니다. css-module을 통해 지역적으로 css를 적용할 수 있습니다. 로컬 css는 `src/common/css`에 위치하며 이름 생성 규칙은 `*.module.css`입니다. 마찬가지로 `index.js`를 통해 export 되고 있어, 아래와 같이 사용 가능합니다.

```
import { FeedbackStyle } from 'common/css'
```

- db는 sqlite3을 사용하고 있으며, 라이브러리는 `sqlite3`을 사용하고 있습니다. 함수는 모두 `src/common/db/index.js`에 있으며, 테이블과 트리거 구조도 여기에서 확인하실 수 있습니다.

- `static` 폴더에는 빌드 후에도 수정할 필요가 있는 파일이 담겨 있습니다. `settings.json`d에는 몇 층인지에 대한 정보가 담겨있고, `strings` 폴더 아래에는 각각의 언어에 대한 같은 형식의 json 파일이 있습니다. 앞으로 언어를 추가, 수정하더라도 key 값은 수정하면 안 됩니다. 추가적으로, db가 이 곳에 생성됩니다. `static` 폴더에 대한 접근은 import, require가 아닌, fs나 fetch를 사용하여야 합니다. import, require 사용하시면 웹팩 컴파일 과정에서 값이 고정되고, 빌드 시 에러가 발생합니다.