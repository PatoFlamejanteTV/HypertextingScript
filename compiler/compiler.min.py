import re
def A(hts_code):
	A=re.compile('(\\w+)\\(\\s*\\"([^\\"]+)\\"\\s*\\)|(\\w+)\\[([^\\]]+)\\]\\(\\)')
	def B(match):
		A=match;B,G,C,D=A.groups()
		if B:return f"<{B}>{G}</{B}>"
		elif C:
			E=D.split('=')
			if len(E)==2:H,F=E;return f'<{C} {H}="{F}">{F}</{C}>'
			else:print(f"Warning: Invalid attribute syntax: {D}");return A.group(0)
		return A.group(0)
	C=A.sub(B,hts_code);return C
