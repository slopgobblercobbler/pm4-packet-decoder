#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItEventWriteShDef {
    static constexpr std::uint8_t opcode = 0x55;
    static constexpr std::string_view name = "IT_EVENT_WRITE_SH";
    static constexpr std::string_view desc = "Emit shader-level hardware event notification";
};
}
