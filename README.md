# Animal V2
   此專案為 **動物認養 v2**  ，主要為 **架構調整** 與 **單元測試** 撰寫 .

## CI / CD
- 使用 circle ci 檢測 tslint、unit test 、build 是否通過 .
- 使用 angular-cli-ghpages  部署到 Github .

## Document
- 使用 compodoc 產生專案文件 .

## 資料夾結構

<table>
	<tr>
		<td colspan="3"> app 底下 </td>
	</tr>
	<tr>
		<td rowspan="3">通用定義</td>
		<td>constant</td>
		<td>各式常數</td>
	</tr>
	<tr>
		<td>enum</td>
		<td>各式參數</td>
	</tr>
	<tr>
		<td>model</td>
		<td>各式資料結構</td>
	</tr>
	<tr>
		<td rowspan="2">獨立頁面</td>
		<td>admin-login</td>
		<td>登入頁</td>
	</tr>
	<tr>
		<td>auth-error</td>
		<td>無權限頁</td>
	</tr>
	<tr>
		<td>版型頁</td>
		<td>layout</td>
		<td>包含 header footer </td>
	</tr>
	<tr>
		<td>內容頁</td>
		<td>pages</td>
		<td>使用版型一的各式內容頁</td>
	</tr>
	<tr>
		<td>核心功能</td>
		<td>core</td>
		<td>系統通用 或是 做成底層的service </td>
	</tr>
	<tr>
		<td>共享功能</td>
		<td>shared</td>
		<td>通用 components 、directives、pipes</td>
	</tr>
	<tr>
		<td>路由管控</td>
		<td>guard</td>
		<td>路由權限控管</td>
	</tr>
	<tr>
		<td>載入資料</td>
		<td>resolver</td>
		<td>進入頁面前，可先拿的資料</td>
	</tr>
</table>
