module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  overrides: [],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react'],
  rules: {
    // 선언한 변수를 사용하지 않았을 때 경고 표시줄 막기
    'no-unused-vars': 'off',
    // 도달하지 않은 코드 사용 시 에러 표시
    // ex) function A() {return 1; return 2;}
    // return 2; => 에러 표시
    'no-unreachable': 'error',
    // 정의되지 않은 변수 사용하면 에러
    'no-undef': 'error',
    // 줄 끝에 공백 처리
    'no-trailing-spaces': 'error',
    // 블록의 중첩 횟수 제어하기
    'max-depth': ['error', { max: 2 }],
    // hooks를 사용할 대 반드시 지켜야 할 규칙 강제
    'react-hooks/rules-of-hooks': 'error',
    // Hooks에서 의존성 배열을 올바르게 관리하도록 권장
    'react-hooks/exhaustive-deps': 'warn',
    // props validation off
    'react/prop-types': 'off',
  },
};
