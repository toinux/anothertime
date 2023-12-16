package org.antonus.anothertime.widget;

import lombok.RequiredArgsConstructor;
import org.antonus.anothertime.config.AnothertimeProperties;
import org.antonus.anothertime.config.AnothertimeProperties.WidgetsProperties.CalendarWidgetProperties;
import org.antonus.anothertime.model.Bitmap;
import org.antonus.anothertime.model.Draw;
import org.antonus.anothertime.model.FilledRectangle;
import org.antonus.anothertime.model.Text;
import org.antonus.anothertime.service.IconsService;
import org.springframework.stereotype.Component;

import java.awt.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.antonus.anothertime.utils.ColorUtils.dimColor;

@Component
@RequiredArgsConstructor
public class CalendarWidget implements Widget {

    private final IconsService iconsService;
    private final AnothertimeProperties anothertimeProperties;
    public final static String DEFAULT_ICON = "bluecalendar.gif";

    @Override
    public Boolean enabled() {
        return anothertimeProperties.getWidgets().getCalendar().getEnabled();
    }

    @Override
    public List<Draw> drawList(int offset, float dim) {

        if (outboundOffset(offset)) {
            return Collections.emptyList();
        }

        CalendarWidgetProperties properties = anothertimeProperties.getWidgets().getCalendar();
        Color color = dimColor(iconsService.defaultColorIfNull(properties.getColor()), dim);
        Color calendarHeadColor = dimColor(iconsService.defaultColorIfNull(properties.getHeadColor(), Color.CYAN), dim);
        Color calendarBodyColor = dimColor(iconsService.defaultColorIfNull(properties.getBodyColor(), Color.WHITE), dim);
        Color calendarTextColor = dimColor(iconsService.defaultColorIfNull(properties.getTextColor(), Color.BLACK), dim);

        List<Draw> drawList = new ArrayList<>();

        var calendarIcon = iconsService.getDimmedIcon(properties.getIcon(), DEFAULT_ICON, dim);

        boolean hasIcon = null != calendarIcon;

        int currentDay = LocalDate.now().getDayOfMonth();

        // text position
        int tpos;

        switch (properties.getStyle()) {
            case ICON -> {
                int ipos = 19;
                tpos = 25;
                if (currentDay < 10) {
                    ipos = 23;
                    tpos = 29;
                }
                if (hasIcon) {
                    drawList.add(new Bitmap(ipos, offset, 8, 8, calendarIcon));
                }
                drawList.add(new Text(tpos, offset + 1, Integer.toString(currentDay), color));
            }
            case LARGE -> {
                tpos = 21;
                if (currentDay < 10) {
                    tpos += 2;
                }
                drawList.add(new FilledRectangle(18, offset, 14, 2, calendarHeadColor));
                drawList.add(new FilledRectangle(18, offset+2, 14, 5, calendarBodyColor));
                drawList.add(new Text(tpos, offset + 1, Integer.toString(currentDay), calendarTextColor));
            }
            case SMALL -> {
                tpos = 24;
                if (currentDay < 10) {
                    tpos += 2;
                }
                drawList.add(new FilledRectangle(23, offset, 9, 2, calendarHeadColor));
                drawList.add(new FilledRectangle(23, offset+2, 9, 5, calendarBodyColor));
                drawList.add(new Text(tpos, offset + 1, Integer.toString(currentDay), calendarTextColor));
            }
            /*

		Case Else ' "small"

			tpos = 23

			If (currentDay < 10) Then
				tpos = tpos + 2
			End If

			For i=0 To 1
				App.drawLine(23, offset+i, 31, offset+i, calendarHeadColor)
			Next
			For i=2 To 6
				App.drawLine(23, offset+i, 31, offset+i, calendarBodyColor)
			Next
			App.drawText(currentDay, tpos, 1+offset,  calendarTextColor)
			*/
        }


        return drawList;

    }
}
